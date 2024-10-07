import { ClientInitializer } from "@/components/ClientInitializer";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
  const session = await getSession();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));
  return (
    <main>
      <ClientInitializer userData={user} />
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p>Welcome, {user.fullName}!</p>
    </main>
  );
}
