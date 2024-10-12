import {
  date,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
  integer,
  bigint,
  numeric,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
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
});

export type User = typeof users.$inferSelect;

// Personal Info Table

export const personalInfo = pgTable("personal_info", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 2000 }),
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
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 2000 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  repaymentPeriod: integer("repayment_period").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  disbursedAt: timestamp("disbursed_at", { withTimezone: true }),
});

export type NewLoan = typeof loans.$inferSelect;

//Property Details Table

export const propertyDetails = pgTable("property_details", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 4000 }),
  loanId: integer("loan_id")
    .notNull()
    .references(() => loans.id),
  titleDeedNumber: varchar("title_deed_number", { length: 255 }).notNull(),
  propertyAddress: text("property_address").notNull(),
});
export type NewPropertyDetail = typeof propertyDetails.$inferSelect;

// Documents

export const documents = pgTable("documents", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 5000 }),
  loanId: integer("loan_id")
    .notNull()
    .references(() => loans.id),
  identificationDocumentLink: text("identification_document_link"),
  powerOfAttorneyLink: text("power_of_attorney_link"),
  titleDeedLink: text("title_deed_link"),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).defaultNow(),
});

export type NewDocument = typeof documents.$inferSelect;

// Loan Repayment
export const repayments = pgTable("repayments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 6000 }),
  loanId: bigint("loan_id", { mode: "number" }).references(() => loans.id),
  amount: numeric("amount").notNull(),
  paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow(),
});

// Define relations
export const loansRelations = relations(loans, ({ one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.id],
  }),
  propertyDetails: one(propertyDetails, {
    fields: [loans.id],
    references: [propertyDetails.loanId],
  }),
  documents: one(documents, {
    fields: [loans.id],
    references: [documents.loanId],
  }),
}));

export const propertyDetailsRelations = relations(
  propertyDetails,
  ({ one }) => ({
    loan: one(loans, {
      fields: [propertyDetails.loanId],
      references: [loans.id],
    }),
  })
);

export const documentsRelations = relations(documents, ({ one }) => ({
  loan: one(loans, {
    fields: [documents.loanId],
    references: [loans.id],
  }),
}));
