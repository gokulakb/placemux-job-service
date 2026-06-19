const express = require("express");
const router = express.Router();

const {
  checkThreshold,
} =
require("../controllers/thresholdController");

router.post(
  "/:jobId/check",
  checkThreshold
);

module.exports = router;