import { ClientInitializer } from "@/components/ClientInitializer";
import LoanApplicationDashboard from "@/components/LoanApplicationDashboard";
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
    <main className="container mx-auto px-4 py-8">
      <ClientInitializer userData={user} />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-xl mb-8">Welcome, {user.fullName}!</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="View Profile"
            description="Update your personal information"
          />
          <QuickActionCard
            title="Loan Status"
            description="Check the status of your current loans"
          />
          <QuickActionCard
            title="Support"
            description="Get help with your account or applications"
          />
        </div>
      </section>
      <section>
        <LoanApplicationDashboard />
      </section>
    </main>
  );
}

function QuickActionCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
