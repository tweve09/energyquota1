const express = require('express');
const router = express.Router();
const {handleDeviceData} = require("../controllers/device")

router.post("/", handleDeviceData)

module.exports = router