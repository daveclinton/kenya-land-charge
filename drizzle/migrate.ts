import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

async function runMigrations() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  });

  const db = drizzle(pool);

  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations Completed Succesfully");
  } catch (error) {
    console.log("Migration failed!", error);
    throw Error;
  } finally {
    await pool.end();
  }
}

export default runMigrations;
