require("dotenv").config();

const pool = require("./src/config/db");

async function seedCompany() {
  try {
    await pool.query(
      `
      INSERT INTO companies
      (id, company_name, email)
      VALUES ($1, $2, $3)
      `,
      [
        "11111111-1111-1111-1111-111111111111",
        "AltroDav Technologies",
        "hr@altrodav.com"
      ]
    );

    console.log("Company inserted!");
  } catch (err) {
    console.error(err.message);
  } finally {
    process.exit();
  }
}

seedCompany();