const router = require("express").Router();

// controllers
const {
  emailLogin__POST,
  socialLogin__POST,
  forgotPassword__POST,
  passwordReset__PUT,
} = require("../../controllers/authController");

/*
  @route /auth/emailLogin
  @method POST
  @access public
*/
router.post("/emailLogin", emailLogin__POST);

/*
  @route /auth/facebookLogin
  @method POST
  @access public
*/
router.post("/socialLogin", socialLogin__POST);

/*
  @route /auth/forgotPassword
  @method POST
  @access public
*/
router.post("/forgotPassword", forgotPassword__POST);

/*
  @route /auth/resetPassword
  @method PUT
*/
router.put("/resetPassword", passwordReset__PUT);

module.exports = router;
