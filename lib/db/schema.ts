import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull().unique(),
  full_name: text("full_name").notNull(),
  phone_number: text("phone_number").notNull().unique().default("Fearful"),
  date_of_birth: date("date_of_birth", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2).max(255),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  date_of_birth: z.string(),
});

export type User = typeof users.$inferSelect;
