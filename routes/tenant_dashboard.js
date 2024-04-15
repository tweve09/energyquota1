const express = require("express");
const router = express.Router();

const { getTenantDashboard } = require("../controllers/tenant_dashboard");

router.get("/", getTenantDashboard);

module.exports = router;
