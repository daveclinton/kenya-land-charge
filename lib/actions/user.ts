"use server";

import { users, UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";
import { ActionResult } from "next/dist/server/app-render/types";
import { eq } from "drizzle-orm";

export async function createUser(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Log the initial form data
  console.log("Form Data:", Array.from(formData.entries()));

  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    full_name: formData.get("full_name"),
    phone_number: formData.get("phone_number"),
    date_of_birth: formData.get("phone_number"),
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
    };
  }

  const { email, password, full_name, phone_number, date_of_birth } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        errors: { email: ["User with email already exists"] },
        message: null,
      };
    }
    const result = await db.insert(users).values({
      email,
      password: hashedPassword,
      full_name,
      phone_number,
      date_of_birth,
    });
    console.log("User Creation Result:", result);
    revalidatePath("/signup");
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: {},
      message: "Database Error: Failed to create user",
    };
  }
  redirect("/login");
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

  const session = await getSession();
  session.userId = user.id;
  session.isLoggedIn = true;
  await session.save();
  redirect("/dashboard");
}
