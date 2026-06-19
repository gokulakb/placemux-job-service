const pool = require("../config/db");

exports.checkThreshold = async (req, res) => {
  console.log("CHECK BODY:", req.body);

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is required"
      });
    }

    const { jobId } = req.params;
    const { skills } = req.body;

    if (!skills) {
      return res.status(400).json({
        success: false,
        message: "skills object is required"
      });
    }

    const result = await pool.query(
      `
      SELECT skill_id, threshold_level
      FROM job_skill_thresholds
      WHERE job_id = $1
      `,
      [jobId]
    );

    const failedSkills = [];

    for (const row of result.rows) {
      const candidateLevel =
        skills[row.skill_id];

      if (
        candidateLevel === undefined ||
        candidateLevel < row.threshold_level
      ) {
        failedSkills.push(row.skill_id);
      }
    }

    return res.status(200).json({
      eligible:
        failedSkills.length === 0,
      failedSkills,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};