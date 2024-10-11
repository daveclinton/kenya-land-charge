import { z } from "zod";
export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name cannot be empty" })
    .max(100, { message: "Full name is too long" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Full name should only contain letters, spaces, hyphens, and apostrophes",
    })
    .trim(),
  email: z.string().email("Please enter a valid email"),
  titleNumber: z.string().min(1, { message: "Title number cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  propertyDescription: z
    .string()
    .min(1, { message: "Property description cannot be empty" }),
  principalAmount: z
    .string()
    .min(1, { message: "Principal amount must be greater than 0" }),
  principalAmountWords: z
    .string()
    .min(1, { message: "Principal amount (in words) cannot be empty" }),
  interestRate: z
    .string({ invalid_type_error: "Please enter a valid number" })
    .min(0, { message: "Interest rate cannot be negative" }),
  repaymentDate: z.date({
    required_error: "Repayment date is required",
  }),
  titleDeedUrl: z.string(),
  chargeDocumentUrl: z.string(),
  personalInsuranceUrl: z.string(),
  powerOfAttorneyUrl: z.string(),
  identificationDocumentUrl: z.string(),
});
