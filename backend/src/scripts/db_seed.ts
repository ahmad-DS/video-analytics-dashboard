import fs from "fs";
import path from "path";
import { pool } from "../db/client";

async function seed() {
  try {
    console.log("Running seed...");

    const seedPath = path.join(
      process.cwd(),
      "postgres",
      "seeds",
      "seed.sql"
    );

    const sql = fs.readFileSync(seedPath, "utf8");

    await pool.query(sql);

    console.log("Seed completed successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();