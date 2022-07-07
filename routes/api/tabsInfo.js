const router = require("express").Router();

const {
  updateUserTabsOpened__PUT,
  getUserTabsInfo__GET,
  getGlobalTabsInfo__GET,
} = require("../../controllers/tabsInfoController");

/*
  @route api/tabsInfo/updateUserTabs
  @method PUT
*/
router.put("/updateUserTabs", updateUserTabsOpened__PUT);

/*
 @route /api/tabsInfo/user/:id
 @method GET
*/
router.get("/user/:userId", getUserTabsInfo__GET);

/*
 @route /api/tabsInfo/global
 @method GET
*/
router.get("/global", getGlobalTabsInfo__GET);

module.exports = router;
