import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  integer,
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

const formDataSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  address: z.string(),
  titleNumber: z.string(),
  propertyDescription: z.string(),
  principalAmount: z.number(),
  principalAmountWords: z.string(),
  interestRate: z.number(),
  repaymentDate: z.date(),
});

export type FormData2 = z.infer<typeof formDataSchema>;

export const formSumissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  titleNumber: varchar("title_number", { length: 255 }).notNull(),
  propertyDescription: varchar("property_description", {
    length: 1000,
  }).notNull(),
  principalAmount: integer("principal_amount").notNull(),
  principalAmountWords: varchar("principal_amount_words", {
    length: 255,
  }).notNull(),
  interestRate: integer("interest_rate").notNull(),
  repaymentDate: date("repayment_date").notNull(),
  titleDeedUrl: varchar("title_deed_url", { length: 255 }),
  chargeDocumentUrl: varchar("charge_document_url", { length: 255 }),
  personalInsuranceUrl: varchar("personal_insurance_url", { length: 255 }),
  powerOfAttorneyUrl: varchar("power_of_attorney_url", { length: 255 }),
  identificationDocumentUrl: varchar("identification_document_url", {
    length: 255,
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
