import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import postgres from "postgres";

// Retrieve the connection string from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not defined");
  process.exit(1);
}

// Define SSL configuration
const sslConfig = {
  rejectUnauthorized: true,
};

// Initialize the postgres client with SSL
const sql = postgres(connectionString, {
  ssl: sslConfig,
});

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
