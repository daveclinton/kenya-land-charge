"use server";

import { users, UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";
import { ActionResult } from "next/dist/server/app-render/types";

export async function createUser(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Log the initial form data
  console.log("Form Data:", Array.from(formData.entries()));

  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
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

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  try {
    const result = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });
    console.log("User Creation Result:", result); // Log the result of the insertion
    revalidatePath("/sign-up");
    redirect("/login");
  } catch (error) {
    console.error("Database Error:", error); // Log the actual error message
    return {
      errors: {},
      message: "Database Error: Failed to create user",
    };
  }
}

export async function Login(formData: FormData) {
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
  redirect("dashboard");
}
