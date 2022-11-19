const asyncHandler = require("express-async-handler");

// utils
const sendError = require("../utils/sendError");

// models
const ShortcutService = require("../services/shortcutService");

/*
  @route /api/shortcuts
  @method POST
*/
const createShortcut__POST = asyncHandler(async (req, res) => {
  let { name, url, userId } = req.body;
  if (!name || !url || !userId || name.trim().length === 0 || url.trim().length === 0) {
    sendError(400, "Name and URL are required fields.", req, res);
  }
  let shortcutService = new ShortcutService();
  var shortcut = await shortcutService.createShortcut(name, url, userId);
  res.json({
    success: true,
    data: shortcut,
  });
});

/*
  @route /api/shortcuts
  @method GET
*/
const getUserShortcuts__GET = asyncHandler(async (req, res) => {
  let userId = req.query.userId;
  if (!userId) {
    sendError(400, "Please provide userId", req, res);
  }
  let shortcutService = new ShortcutService();
  let shortcuts = await shortcutService.getUserShortcuts(userId);
  res.json({
    success: true,
    data: shortcuts,
  });
});

/*
  @route /api/shortcuts/:shortcutId
  @method PUT
*/
const updateShortcut__PUT = asyncHandler(async (req, res) => {
  let { name, url, shortcutId } = req.body;
  if (!name || !url || !shortcutId) {
    sendError(400, "Required fields are missing", req, res);
  }

  let shortcutService = new ShortcutService();
  var updated = await shortcutService.updateShortcut(shortcutId, name, url);
  
  res.json({
    success: true,
    data: updated,
  });
});

/*
  @route /api/shortcuts/:shortcutId
  @method DELETE
*/
const deleteShortcut__DELETE = asyncHandler(async (req, res) => {
  let shortcutId = req.params.shortcutId;
  if (!shortcutId) {
    sendError(400, "Required fields are missing", req, res);
  }

  let shortcutService = new ShortcutService();
  var deleted = await shortcutService.deleteShortcut(shortcutId);
  
  res.json({
    success: true,
    data: deleted,
  });
});

module.exports = {
  createShortcut__POST,
  getUserShortcuts__GET,
  updateShortcut__PUT,
  deleteShortcut__DELETE
};
