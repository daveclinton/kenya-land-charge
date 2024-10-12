import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  MessageSquare,
  BarChart2,
  Settings,
  ChevronRight,
  DollarSign,
} from "lucide-react";

export function RecentLoanActivity() {
  const activities = [
    {
      type: "Application Submitted",
      amount: 15000,
      status: "Pending",
      icon: "📝",
    },
    { type: "Loan Approved", amount: 50000, status: "Approved", icon: "✅" },
    { type: "Payment Made", amount: 1200, status: "Completed", icon: "💰" },
    {
      type: "Application Rejected",
      amount: 75000,
      status: "Rejected",
      icon: "❌",
    },
    { type: "Loan Disbursed", amount: 30000, status: "Completed", icon: "🏦" },
  ];

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-sky-900">
          Recent Loan Activity
        </CardTitle>
        <Button variant="ghost" className="text-sm font-medium text-sky-500">
          View All
          <ChevronRight className="ml-1 h-4 w-4 text-sky-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div>
                  <p className="font-medium text-sky-900">{activity.type}</p>
                  <p className="text-sm text-sky-700">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium flex items-center justify-end text-sky-900">
                  <DollarSign className="h-4 w-4 mr-1 text-sky-500" />
                  {activity.amount.toLocaleString()}
                </p>
                <Badge
                  variant={
                    activity.status === "Approved" ||
                    activity.status === "Completed"
                      ? "default"
                      : activity.status === "Rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function MobileNavigation() {
  return (
    <nav className="lg:hidden fixed bottom-0 bg-white w-full left-0 right-0 border-t border-sky-200 z-50">
      <div className="container flex items-center justify-around h-16 bg-white">
        <NavButton
          icon={<Home className="h-5 w-5 text-sky-500" />}
          label="Home"
        />
        <NavButton
          icon={<MessageSquare className="h-5 w-5 text-sky-500" />}
          label="Messages"
        />
        <NavButton
          icon={<BarChart2 className="h-5 w-5 text-sky-500" />}
          label="Analytics"
        />
        <NavButton
          icon={<Settings className="h-5 w-5 text-sky-500" />}
          label="Settings"
        />
      </div>
    </nav>
  );
}

function NavButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex flex-col items-center py-2 px-0 h-auto text-sky-900"
    >
      {icon}
      <span className="text-xs mt-1 text-sky-700">{label}</span>
    </Button>
  );
}
