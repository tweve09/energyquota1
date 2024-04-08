const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/authMiddleware");
const {
  getTenants,
  getTenantsRegister,
  postTenantRegister,
} = require("../controllers/tenants");

router.get("/", isAuth, getTenants);
router.get("/register", isAuth, getTenantsRegister);
router.post("/register", isAuth, postTenantRegister);

module.exports = router;
