import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ClientInitializer } from "@/components/ClientInitializer";
import { DashboardHeader } from "@/components/DashboardHeader";
import { QuickApplySection } from "@/components/QuickApply";
import {
  MobileNavigation,
  RecentLoanActivity,
} from "@/components/RecentActivity";
import LoanSummary from "@/components/features/LoanSummary";

export default async function Dashboard() {
  const session = await getSession();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <ClientInitializer userData={user} />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto pb-16 lg:pb-8">
        <DashboardHeader user={user} />
        <div className="flex flex-col lg:flex-row mb-10 gap-5 ">
          <QuickApplySection />
          <LoanSummary />
        </div>
        <RecentLoanActivity />
      </main>
      {/* Bottom Navigation for mobile */}
      <MobileNavigation />
    </div>
  );
}
