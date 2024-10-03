import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not defined");
  process.exit(1);
}

const sql = postgres(connectionString);

const testConnection = async () => {
  try {
    await sql`SELECT 1`;
    console.log("Database connection successful");
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    await sql.end();
    process.exit(1);
  }
};

testConnection();
