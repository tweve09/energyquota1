var express = require("express");
const passport = require("passport");
var router = express.Router();
const { isAuth } = require("../middleware/authMiddleware");
const {
  getLanding,
  getDashboard,
  getAddTenant,
  postAddTenant,
  getTenantLogin,
  getTenantHome,
  logOutTenant,
  getBuyUnit,
  postBuyUnit
} = require("../controllers/index");

router.get("/", getLanding);
router.get("/dashboard", isAuth, getDashboard);
router.get("/dashboard/addtenant", isAuth, getAddTenant);
router.post("/dashboard/addtenant", isAuth, postAddTenant);
router.get("/tenant", getTenantHome);
router.get("/tenant/buyunit", getBuyUnit)
router.post("/tenant/buyunit", postBuyUnit)
router.get("/tenant/login", getTenantLogin);
router.post(
  "/tenant/login",
  passport.authenticate("tenant", {
    successRedirect: "/tenant",
    failureRedirect: "/tenant/login",
    failureFlash: true,
  })
);
router.get("/tenant/logout", logOutTenant);

module.exports = router;
