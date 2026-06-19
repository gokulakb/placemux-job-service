require("dotenv").config();
const pool = require("../src/config/db");

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id UUID PRIMARY KEY,
        company_name VARCHAR(100),
        email VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY,
        company_id UUID REFERENCES companies(id),
        title VARCHAR(200),
        description TEXT,
        location VARCHAR(100),
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS skills (
        id UUID PRIMARY KEY,
        skill_name VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS job_skill_thresholds (
        id UUID PRIMARY KEY,
        job_id UUID REFERENCES jobs(id),
        skill_id UUID REFERENCES skills(id),
        threshold_level INT CHECK (
          threshold_level BETWEEN 1 AND 100
        )
      );

      CREATE TABLE IF NOT EXISTS assessment_links (
        id UUID PRIMARY KEY,
        job_id UUID REFERENCES jobs(id),
        assessment_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS job_events (
        id UUID PRIMARY KEY,
        job_id UUID,
        event_type VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tables created successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

createTables();