import { ClientInitializer } from "@/components/ClientInitializer";
import { MobileNavigation } from "@/components/RecentActivity";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import React from "react";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));
  return (
    <div className="flex flex-col h-screen bg-white lg:flex-row">
      <ClientInitializer userData={user} />
      <main className="flex-1 p-4 lg:p-8 overflow-auto pb-16 lg:pb-8">
        {/* <DashboardHeader user={user} /> */}
        <React.Fragment>{children}</React.Fragment>
      </main>
      <MobileNavigation />
    </div>
  );
}
