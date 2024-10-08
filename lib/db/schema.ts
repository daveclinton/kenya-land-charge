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
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(255, { message: "Full name must be at most 255 characters long." })
    .trim()
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Full name can only contain letters, spaces, apostrophes, and hyphens.",
    }),
  phoneNumber: z.string(),
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
