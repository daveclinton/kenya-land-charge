"use server";

import { users, UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const valiatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!valiatedFields.success) {
    return {
      errors: valiatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = valiatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });
    revalidatePath("/sign-up");
    redirect("/login");
  } catch (error) {
    return {
      message: "Database Error: Failed to create user",
    };
  }
}
