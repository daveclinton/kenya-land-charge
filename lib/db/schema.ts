import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phoneNumber: text("phone_number").notNull().unique().default("Fearful"),
  dateOfBirth: date("date_of_birth", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2).max(255),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  dateOfBirth: z
    .string()
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate <= today;
    }, "Date of birth cannot be in the future")
    .transform((str) => new Date(str)),
});

export type User = typeof users.$inferSelect;
