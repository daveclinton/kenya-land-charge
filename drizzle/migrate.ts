import dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined in environment variables.");
  process.exit(1);
}

const isLocal =
  DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");

const sslConfig = isLocal
  ? false
  : {
      rejectUnauthorized: false,
    };

// Optional: Log DATABASE_URL in non-production environments
if (process.env.NODE_ENV !== "production") {
  console.log("DATABASE_URL:", DATABASE_URL);
}

const sql = postgres(DATABASE_URL, {
  max: 10,
  ssl: sslConfig,
  onnotice: (notice) => console.log("Database Notice:", notice),
  onparameter: (parameterStatus) =>
    console.log("Parameter Status:", parameterStatus),
});

const db = drizzle(sql);

const main = async () => {
  try {
    console.log("Attempting database connection...");
    await sql`SELECT 1`; // Explicit connection test
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database operation failed:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  } finally {
    await sql.end();
    console.log("Database connection closed");
  }
};

main().catch((err) => {
  console.error("Unhandled error in main function:", err);
  process.exit(1);
});
