import fs from "fs";
import path from "path";
import { pool } from "../db/client";

async function migrate() {
  try {
    console.log("Running migration...");

    const schemaPath = path.join(
      process.cwd(),
      "postgres",
      "migrations",
      "001_initial_schema.sql"
    );

    const sql = fs.readFileSync(schemaPath, "utf8");

    await pool.query(sql);

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();