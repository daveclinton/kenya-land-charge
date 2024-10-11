"use server";

import { formSumissions, users, UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";
import { eq, or } from "drizzle-orm";
import { sendConfirmationEmail } from "./email";
const { randomBytes } = require("node:crypto");

type ActionResult = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};

export async function createUser(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  console.log("Form Data:", Array.from(formData.entries()));

  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    phoneNumber: formData.get("phoneNumber"),
    dateOfBirth: formData.get("dateOfBirth"),
  });

  console.log("Validation Result:", validatedFields);

  if (!validatedFields.success) {
    console.error(
      "Validation Errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      success: false,
    };
  }

  const { email, password, fullName, phoneNumber, dateOfBirth } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  const confirmationToken = randomBytes(32).toString("hex");

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.phoneNumber, phoneNumber)))
      .limit(1);

    if (existingUser.length > 0) {
      const existingField =
        existingUser[0].email === email ? "email" : "phone number";
      return {
        errors: {
          [existingField]: [`User with this ${existingField} already exists`],
        },
        message: null,
        success: false,
      };
    }

    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
      dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      emailConfirmed: false,
      confirmationToken: confirmationToken,
    });

    await sendConfirmationEmail(email, confirmationToken);
    revalidatePath("/signup");

    // Return a success message and flag
    return {
      errors: {},
      message:
        "User created successfully. Please check your email for confirmation.",
      success: true,
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: {},
      message: "Database Error: Failed to create user",
      success: false,
    };
  }
}

export async function confirmEmail(token: string): Promise<ActionResult> {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.confirmationToken, token),
    });
    if (!user) {
      return {
        errors: {},
        message: "Invalid Confirmation token",
      };
    }
    await db
      .update(users)
      .set({ emailConfirmed: true, confirmationToken: null })
      .where(eq(users.id, user.id));
    return {
      errors: {},
      message: "Email Confirmed Succesfully",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: {},
      message: "Database Error: Failed to confirm email",
    };
  }
}

export async function Login(prevState: ActionResult, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      message: "Invalid email or password",
    };
  }
  if (!user.emailConfirmed) {
    return {
      message: "Please confirm email before loggin in",
    };
  }
  const session = await getSession();
  session.userId = user.id;
  session.isLoggedIn = true;
  await session.save();
  redirect("/dashboard");
}

type DocumentUrls = {
  titleDeed?: string;
  chargeDocument?: string;
  personalInsurance?: string;
  powerOfAttorney?: string;
  identificationDocument?: string;
};

export async function createFormSubmission(
  formData: any,
  documentUrls: DocumentUrls
) {
  try {
    const result = await db.insert(formSumissions).values({
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      titleNumber: formData.titleNumber,
      propertyDescription: formData.propertyDescription,
      principalAmount: formData.principalAmount,
      principalAmountWords: formData.principalAmountWords,
      interestRate: formData.interestRate,
      repaymentDate: formData.repaymentDate,
      titleDeedUrl: documentUrls.titleDeed,
      chargeDocumentUrl: documentUrls.chargeDocument,
      personalInsuranceUrl: documentUrls.personalInsurance,
      powerOfAttorneyUrl: documentUrls.powerOfAttorney,
      identificationDocumentUrl: documentUrls.identificationDocument,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Database insertion failed:", error);
    return { success: false, error: "Failed to save form submission" };
  }
}
