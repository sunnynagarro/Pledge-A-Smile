const router = require("express").Router();

// controllers
const {
  updateImpactLevel__PUT,
} = require("../../controllers/userInfoController");

/*
  @route /api/userInfo/updateImpactLevel
  @method PUT
*/
router.put("/updateImpactLevel", updateImpactLevel__PUT);

module.exports = router;
