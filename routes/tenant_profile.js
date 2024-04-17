const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/authMiddleware");
const { getTenantProfile } = require("../controllers/tenant_profile");
router.get("/", isAuth, getTenantProfile);

module.exports = router;
