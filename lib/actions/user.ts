"use server";

import { users, UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";

const initialState = {
  message: null,
  errors: {},
};

export async function createUser(
  prevState: typeof initialState,
  formData: FormData
) {
  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    };
  }

  const { email, password, name } = validatedFields.data;

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
