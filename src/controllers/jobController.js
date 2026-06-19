const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE JOB
exports.createJob = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const {
      companyId,
      title,
      description,
      location,
      skills,
    } = req.body;

    // Validate required fields
    if (
      !companyId ||
      !title ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "companyId, title, description and location are required",
      });
    }

    // Validate skills array
    if (
      !skills ||
      !Array.isArray(skills) ||
      skills.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one skill threshold is required",
      });
    }

    const jobId = uuidv4();

    // Insert Job
    await pool.query(
      `
      INSERT INTO jobs
      (id, company_id, title, description, location)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        jobId,
        companyId,
        title,
        description,
        location,
      ]
    );

    // Insert Skill Thresholds
    for (const skill of skills) {
      await pool.query(
        `
        INSERT INTO job_skill_thresholds
        (id, job_id, skill_id, threshold_level)
        VALUES ($1, $2, $3, $4)
        `,
        [
          uuidv4(),
          jobId,
          skill.skillId,
          skill.threshold,
        ]
      );
    }

    // Generate Assessment Link
    const assessmentLink =
      `https://placemux.com/assessment/${jobId}`;

    await pool.query(
      `
      INSERT INTO assessment_links
      (id, job_id, assessment_url)
      VALUES ($1, $2, $3)
      `,
      [
        uuidv4(),
        jobId,
        assessmentLink,
      ]
    );

    // Create Job Event
    await pool.query(
      `
      INSERT INTO job_events
      (id, job_id, event_type)
      VALUES ($1, $2, $3)
      `,
      [
        uuidv4(),
        jobId,
        "JOB_PUBLISHED",
      ]
    );

    return res.status(201).json({
      success: true,
      message:
        "Job published successfully",
      jobId,
      assessmentLink,
    });

  } catch (error) {
    console.error(
      "Create Job Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL JOBS
exports.getAllJobs = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        company_id,
        title,
        description,
        location,
        status,
        created_at
      FROM jobs
      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({
      success: true,
      totalJobs: result.rows.length,
      jobs: result.rows,
    });

  } catch (error) {
    console.error(
      "Get Jobs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};