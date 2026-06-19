const pool = require("../config/db");

exports.getStats =
  async (req, res) => {
    try {
      const total =
        await pool.query(
          `
          SELECT COUNT(*) AS total
          FROM jobs
          `
        );

      const active =
        await pool.query(
          `
          SELECT COUNT(*) AS active
          FROM jobs
          WHERE status='ACTIVE'
          `
        );

      res.json({
        totalJobs:
          total.rows[0].total,
        activeJobs:
          active.rows[0].active,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };