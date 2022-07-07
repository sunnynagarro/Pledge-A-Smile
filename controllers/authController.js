const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const shortid = require("shortid");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// models
const User = require("../models/User");

// utils
const sendError = require("../utils/sendError");

const emailLogin__POST = asyncHandler(async (req, res) => {
  let { email, password, referralId } = req.body;
  email = email && email.trim();
  password = password && password.trim();

  if (!email || !password) {
    sendError(400, "Please include email and password", req, res);
  }
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    // User already exists
    if (bcrypt.compareSync(password, existingUser.password)) {
      existingUser = existingUser.toObject();
      delete existingUser["password"];
      delete existingUser["__v"];
      let token = jwt.sign(existingUser, JWT_SECRET);
      res.json({
        success: true,
        user: existingUser,
        token,
      });
    } else {
      sendError(401, "Invalid Credentials", req, res);
    }
  } else {
    // create new user
    let dbFields = {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: email.split("@")[0],
      tabsOpened: 0,
      referralId: shortid.generate(),
      impactLevel: 1,
    };
    let referralUser = null;
    if (referralId) {
      referralUser = await User.findOne({ referralId });
      if (!referralUser) {
        sendError(400, "Invalid referralCode", req, res);
      }
    }
    let newUser = await User.create(dbFields);
    if (!newUser) {
      sendError(500, "Error while creating user", req, res);
    }
    newUser = newUser.toObject();
    if (referralId && referralUser) {
      let referralUserReferrals = JSON.parse(referralUser.referrals);
      referralUserReferrals.push(newUser._id);
      referralUser.referrals = JSON.stringify(referralUserReferrals);
      await referralUser.save();
    }
    delete newUser["password"];
    delete newUser["__v"];
    let token = jwt.sign(newUser, JWT_SECRET);
    res.json({
      success: true,
      user: newUser,
      token,
    });
  }
});

const socialLogin__POST = asyncHandler(async (req, res) => {
  let { email, name, referralId } = req.body;
  if (!name || !email) {
    sendError(400, "No name or email found", req, res);
  }
  let userFromDB = await User.findOne({ email });
  if (!userFromDB) {
    let dbFields = {
      email: email,
      name: name,
      tabsOpened: 0,
      referralId: shortid.generate(),
      impactLevel: 1,
    };
    let referralUser = null;
    if (referralId) {
      referralUser = await User.findOne({ referralId });
      if (!referralUser) {
        sendError(400, "Invalid referral code", req, res);
      }
    }
    let newUser = await User.create(dbFields);
    if (!newUser) {
      sendError(500, "Error while creating user", req, res);
    }
    newUser = newUser.toObject();
    if (referralId && referralUser) {
      let referralUserReferrals = JSON.parse(referralUser.referrals);
      referralUserReferrals.push(newUser._id);
      referralUser.referrals = JSON.stringify(referralUserReferrals);
      await referralUser.save();
    }
    delete newUser["password"];
    delete newUser["__v"];
    let token = jwt.sign(newUser, JWT_SECRET);
    res.json({
      success: true,
      user: newUser,
      token,
    });
  } else {
    userFromDB = userFromDB.toObject();
    delete userFromDB["password"];
    delete userFromDB["__v"];
    let token = jwt.sign(userFromDB, JWT_SECRET);
    res.json({
      success: true,
      user: userFromDB,
      token,
    });
  }
});

const forgotPassword__POST = asyncHandler(async (req, res) => {
  let { email } = req.body;
  if (!email) {
    sendError(400, "No email found in request body", req, res);
  }
  let userFromDB = await User.findOne({ email });
  if (!userFromDB) {
    sendError(400, "Email not registered", req, res);
  }
  const token = crypto.randomBytes(20).toString("hex");
  userFromDB.resetPasswordToken = token;
  userFromDB.resetPasswordExpires = Date.now() + 3600000;
  await userFromDB.save();
  const transporter = nodemailer.createTransport({
    host: "smtp.darkcodelab.in",
    port: 587,
    secure: false,
    ignoreTLS: true,
    rejectUnauthorized: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Link To Reset Password",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n${process.env.CLIENT_URL}/reset/${token}\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  transporter.sendMail(mailOptions, function (err, response) {
    if (err) {
      sendError(500, err, req, res);
    } else {
      res.json({
        success: true,
        message: "recovery email sent",
      });
    }
  });
});

const passwordReset__PUT = asyncHandler(async (req, res) => {
  let { password, resetPasswordToken } = req.body;
  let userFromDB = await User.findOne({ resetPasswordToken });
  console.log(resetPasswordToken);
  if (!userFromDB) {
    sendError(400, "Invalid Token", req, res);
  }
  userFromDB.password = bcrypt.hashSync(password, 10);
  userFromDB.resetPasswordExpires = "";
  userFromDB.resetPasswordToken = "";
  await userFromDB.save();
  res.json({
    success: true,
    message: "Password updated",
  });
});

module.exports = {
  emailLogin__POST,
  socialLogin__POST,
  forgotPassword__POST,
  passwordReset__PUT,
};
