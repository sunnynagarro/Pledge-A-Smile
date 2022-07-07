const asyncHandler = require("express-async-handler");

// utils
const sendError = require("../utils/sendError");

// models
const User = require("../models/User");

/*
  @route /api/userInfo/updateImpactLevel
  @method PUT
*/
const updateImpactLevel__PUT = asyncHandler(async (req, res) => {
  let { userId, level } = req.body;
  if (!userId || !level) {
    sendError(400, "Please include userId and level", req, res);
  }
  let userFromDB = await User.findOne({ _id: userId });
  if (!userFromDB) {
    sendError(400, "No user found with that ID", req, res);
  }
  userFromDB.impactLevel = level;
  await userFromDB.save();
  userFromDB = userFromDB.toObject();
  delete userFromDB["password"];
  delete userFromDB["__v"];
  res.json({
    success: true,
    user: userFromDB,
  });
});

module.exports = {
  updateImpactLevel__PUT,
};
