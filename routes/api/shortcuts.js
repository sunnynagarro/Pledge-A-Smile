const router = require("express").Router();

const {
  createShortcut__POST,
  getUserShortcuts__GET,
  updateShortcut__PUT,
  deleteShortcut__DELETE,
} = require("../../controllers/shortcutsController");

/*
  @route api/shortcuts
  @method POST
*/
router.post("/", createShortcut__POST);

/*
 @route api/shortcuts
 @method GET
*/
router.get("/", getUserShortcuts__GET);

/*
 @route /api/shortcuts/:shortcutId
 @method PUT
*/
router.put("/:shortcutId", updateShortcut__PUT);

/*
 @route /api/shortcuts/:shortcutId
 @method DELETE
*/
router.delete("/:shortcutId", deleteShortcut__DELETE);

module.exports = router;
