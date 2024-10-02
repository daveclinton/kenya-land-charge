import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// Debugging: Log the DATABASE_URL to ensure it's loaded
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(sql);

const main = async () => {
  await migrate(db, { migrationsFolder: "./lib/db/migrations" });
  await sql.end();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
