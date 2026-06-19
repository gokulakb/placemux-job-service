const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
} = require("../controllers/jobController");

// View all jobs
router.get("/", getAllJobs);

// Create a new job
router.post("/", createJob);

module.exports = router;