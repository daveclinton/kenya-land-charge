import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  integer,
  bigint,
  numeric,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  // phoneNumber: text("phone_number").unique(),
  // dateOfBirth: date("date_of_birth", { mode: "string" }),
  createdAt: timestamp("created_at").defaultNow(),
  emailConfirmed: boolean("email_confirmed").notNull().default(false),
  confirmationToken: varchar("confirmation_token", { length: 64 }),
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
  // phoneNumber: z.string(),
  // dateOfBirth: z
  //   .string()
  //   .refine((date) => {
  //     const birthDate = new Date(date);
  //     const today = new Date();
  //     return birthDate <= today;
  //   }, "Date of birth cannot be in the future")
  //   .transform((str) => new Date(str)),
});

export type User = typeof users.$inferSelect;

// Personal Info Table

export const personalInfo = pgTable("personal_info", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  userId: bigint("user_id", { mode: "number" }).references(() => users.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address").notNull(),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
});

export type PersonalInfo = typeof personalInfo.$inferSelect;

// Loans Table

export const loans = pgTable("loans", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  userId: bigint("user_id", { mode: "number" }).references(() => users.id),
  amount: numeric("amount").notNull(),
  repaymentPeriod: integer("repayment_period").notNull(),
  status: text("status").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  disbursedAt: timestamp("disbursed_at", { withTimezone: true }),
});

//Property Details Table
export const propertyDetails = pgTable("property_details", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  loanId: bigint("loan_id", { mode: "number" }).references(() => loans.id),
  titleDeedNumber: text("title_deed_number").notNull(),
  propertyAddress: text("property_address").notNull(),
});

// Documents

export const documents = pgTable("documents", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  loanId: bigint("loan_id", { mode: "number" }).references(() => loans.id),
  identificationDocumentLink: text("identification_document_link"),
  powerOfAttorneyLink: text("power_of_attorney_link"),
  titleDeedLink: text("title_deed_link"),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).defaultNow(),
});

// Loan Repayment
export const repayments = pgTable("repayments", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  loanId: bigint("loan_id", { mode: "number" }).references(() => loans.id),
  amount: numeric("amount").notNull(),
  paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow(),
});
