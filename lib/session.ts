import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type SessionData = {
  userId: number;
  isLoggedIn: boolean;
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.SESSION_PASSWORD as string,
    cookieName: "user-session",
  });

  return session;
}

export async function logout() {
  const session = await getSession();
  session.userId = null as any;
  session.isLoggedIn = false;
  await session.save();
  redirect("/");
}
