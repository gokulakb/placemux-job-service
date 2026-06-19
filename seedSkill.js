require("dotenv").config();

const pool = require("./src/config/db");

async function seedSkill() {
  try {
    await pool.query(
      `
      INSERT INTO skills
      (id, skill_name)
      VALUES ($1, $2)
      `,
      [
        "22222222-2222-2222-2222-222222222222",
        "Python"
      ]
    );

    console.log("Skill inserted!");
  } catch (err) {
    console.error(err.message);
  } finally {
    process.exit();
  }
}

seedSkill();