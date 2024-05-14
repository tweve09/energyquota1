const express = require('express');
const router = express.Router();

const { isAuth} = require("../middleware/authMiddleware")
const { getRechargePage } = require("../controllers/tenant_recharge")


router.get("/", isAuth, getRechargePage)

module.exports = router;