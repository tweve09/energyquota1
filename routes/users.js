var express = require("express");
var router = express.Router();
const passport = require('passport');
const {
  getRegisterUser,
  getLoginUser,
  postRegisterUser,
  logOutUser
} = require("../controllers/user");


router.get("/register", getRegisterUser);
router.get("/login", getLoginUser);
router.post("/register", postRegisterUser);
router.post(
  "/login",
  passport.authenticate("owner", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
router.get("/logout", logOutUser)

module.exports = router;
