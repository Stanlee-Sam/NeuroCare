const express = require ("express");
const { trackUsage, fetchUsage } = require("../controllers/feature.controller.js");

const router = express.Router();

router.post("/track-feature", trackUsage);
router.get("/feature-usage", fetchUsage);

module.exports = router;
