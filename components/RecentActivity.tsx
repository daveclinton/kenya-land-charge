import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, MessageSquare, BarChart2, Settings } from "lucide-react";

export function RecentLoanActivity() {
  const activities = [
    { type: "Application Submitted", amount: 15000, status: "Pending" },
    { type: "Loan Approved", amount: 50000, status: "Approved" },
    { type: "Payment Made", amount: 1200, status: "Completed" },
    { type: "Application Rejected", amount: 75000, status: "Rejected" },
    { type: "Loan Disbursed", amount: 30000, status: "Completed" },
  ];

  return (
    <section className="mb-8">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Loan Activity</CardTitle>
          <Button variant="link">View All</Button>
        </CardHeader>
        <CardContent>
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium">{activity.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${activity.amount.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    activity.status === "Approved" ||
                    activity.status === "Completed"
                      ? "text-green-500"
                      : activity.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {activity.status}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export function MobileNavigation() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
      <Button variant="ghost" size="sm" className="flex flex-col items-center">
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Home</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center">
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs mt-1">Messages</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center">
        <BarChart2 className="h-5 w-5" />
        <span className="text-xs mt-1">Analytics</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center">
        <Settings className="h-5 w-5" />
        <span className="text-xs mt-1">Settings</span>
      </Button>
    </nav>
  );
}
