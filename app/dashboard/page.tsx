import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ClientInitializer } from "@/components/ClientInitializer";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader, MobileHeader } from "@/components/DashboardHeader";
import { QuickApplySection } from "@/components/QuickApply";
import {
  MobileNavigation,
  RecentLoanActivity,
} from "@/components/RecentActivity";

export default async function Dashboard() {
  const session = await getSession();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <ClientInitializer userData={user} />

      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white p-6">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto pb-16 lg:pb-8">
        <MobileHeader />
        <DashboardHeader user={user} />
        <QuickApplySection />
        <RecentLoanActivity />
      </main>

      {/* Bottom Navigation for mobile */}
      <MobileNavigation />
    </div>
  );
}
