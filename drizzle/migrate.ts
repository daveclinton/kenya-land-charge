import dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: false,
  onnotice: (notice) => console.log("Database Notice:", notice),
  onparameter: (parameterStatus) =>
    console.log("Parameter Status:", parameterStatus),
});

const db = drizzle(sql);

const main = async () => {
  try {
    console.log("Attempting database connection...");
    console.log("Database connection successful");
    console.log("Starting migration...");
    await migrate(db, { migrationsFolder: "./lib/db/migrations" });
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Database operation failed:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  } finally {
    await sql.end();
  }
};

main().catch((err) => {
  console.error("Unhandled error in main function:", err);
  process.exit(1);
});
