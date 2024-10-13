"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  ChevronRight,
  DollarSign,
  UserCircle2,
  BanknoteIcon,
  CreditCardIcon,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  FileText,
  Frown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Activity {
  id: number;
  type: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "DISBURSED" | "COMPLETED" | "REJECTED";
  createdAt: string;
}

export function RecentLoanActivity({ userId }: { userId: any }) {
  const [activities, setActivities] = useState<Activity[] | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `/api/recent-transactions?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
      }
    };

    fetchActivities();
  }, [userId]);

  const getIcon = (type: string) => {
    switch (type) {
      case "Application Submitted":
        return <FileText className="h-6 w-6 text-sky-500" />;
      case "Loan Approved":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "Loan Disbursed":
        return <BanknoteIcon className="h-6 w-6 text-blue-500" />;
      case "Payment Made":
        return <CreditCardIcon className="h-6 w-6 text-purple-500" />;
      case "Loan Rejected":
        return <Frown className="h-6 w-6 text-yellow-300" />;
      default:
        return <RefreshCw className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "DISBURSED":
        return "bg-blue-100 text-blue-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-white mb-5">
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
          {activities === null ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
            </div>
          ) : activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-sky-700">
              <AlertCircle className="h-12 w-12 mb-4 text-sky-500" />
              <p className="text-lg font-medium">No Recent Activity</p>
              <p className="text-sm text-center mt-2">
                There hasn't been any loan activity. Apply for a loan to get
                started.
              </p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                    {getIcon(activity.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sky-900">{activity.type}</p>
                    <p className="text-sm text-sky-700">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium flex items-center justify-end text-sky-900">
                    <DollarSign className="h-4 w-4 mr-1 text-sky-500" />
                    {activity.amount.toLocaleString()}
                  </p>
                  <Badge className={`${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function MobileNavigation() {
  return (
    <nav className="lg:hidden fixed bottom-0 bg-white left-0 right-0 border-t border-sky-200 z-50">
      <div className="container flex items-center justify-around h-16 bg-white">
        <NavLink
          href="/dashboard"
          icon={<Home className="h-5 w-5 text-sky-500" />}
          label="Home"
        />
        <NavLink
          href="/dashboard/applications"
          icon={<BanknoteIcon className="h-5 w-5 text-sky-500" />}
          label="Applications"
        />
        <NavLink
          href="/dashboard/payments"
          icon={<CreditCardIcon className="h-5 w-5 text-sky-500" />}
          label="Payments"
        />
        <NavLink
          href="/dashboard/profile"
          icon={<UserCircle2 className="h-5 w-5 text-sky-500" />}
          label="My Profile"
        />
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center py-2 px-5 rounded-lg h-auto text-sky-900 hover:bg-sky-100 transition-colors duration-200 ${
        isActive ? "bg-sky-100" : ""
      }`}
    >
      {icon}
      <span className="text-xs mt-1 text-sky-700">{label}</span>
    </Link>
  );
}
