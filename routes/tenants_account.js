const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getTenantLogin,
  logOutTenant,
} = require("../controllers/tenants_account");

router.get("/login", getTenantLogin);
router.post(
  "/login",
  passport.authenticate("tenant", {
    successRedirect: "/tenant",
    failureRedirect: "/tenants_account/login",
    failureFlash: true,
  })
);
router.post("/logout", logOutTenant);

module.exports = router;
