const asyncHandler = require("express-async-handler");

// utils
const sendError = require("../utils/sendError");

// models
const User = require("../models/User");
const GlobalTabs = require("../models/GlobalTabs");

/*
  @route api/tabsInfo/user
  @method PUT
*/
const updateUserTabsOpened__PUT = asyncHandler(async (req, res) => {
  let userId = req.body.userId;
  if (!userId) {
    sendError(400, "Bad request", req, res);
  }
  let userFromDB = await User.findOne({ _id: userId });
  if (!userFromDB) {
    sendError(400, "No user found with that ID", req, res);
  }
  userFromDB.tabsOpened = userFromDB.tabsOpened + 1;
  let globalTabRecord = await GlobalTabs.find({}).limit(1);
  if (globalTabRecord.length < 1) {
    await GlobalTabs.create({
      tabsOpened: 1,
    });
  } else {
    await GlobalTabs.findOneAndUpdate(
      { _id: globalTabRecord[0]._id },
      { $inc: { tabsOpened: 1 } },
      { new: true }
    ).exec();
  }
  await userFromDB.save();
  res.json({
    success: true,
    tabsOpened: userFromDB.tabsOpened,
  });
});

const getUserTabsInfo__GET = asyncHandler(async (req, res) => {
  let userId = req.params.userId;
  let userFromDB = await User.findOne({ _id: userId });
  if (!userFromDB) {
    sendError(400, "No user found with that ID", req, res);
  }
  res.json({
    success: true,
    tabsOpened: userFromDB.tabsOpened,
  });
});

const getGlobalTabsInfo__GET = asyncHandler(async (req, res) => {
  let globalTabRecord = await GlobalTabs.find({}).limit(1);
  res.json({
    success: true,
    tabsOpened: globalTabRecord[0].tabsOpened,
  });
});

module.exports = {
  updateUserTabsOpened__PUT,
  getUserTabsInfo__GET,
  getGlobalTabsInfo__GET,
};
