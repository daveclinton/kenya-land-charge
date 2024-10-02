import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
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
