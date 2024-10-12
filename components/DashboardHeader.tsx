import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function DashboardHeader({
  user,
}: {
  user: { fullName: string; email: string };
}) {
  return (
    <header className="bg-white sticky p-5 top-0 z-50 mb-5 rounded-md w-full border-b border-sky-200">
      <div className="container flex h-10 items-center justify-between">
        <h1 className="text-xl font-semibold text-sky-900">
          Kiathagana Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-sky-500" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
              alt={user.fullName}
            />
            <AvatarFallback className="text-sky-900">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="container py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-sky-900">
              Welcome Back, {user.fullName}
            </h2>
          </div>
          <nav className="hidden lg:block w-full lg:w-auto">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-sky-700 hover:underline"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="dashboard/applications"
                  className="text-sky-700 hover:underline"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href="dashboard/payments"
                  className="text-sky-700 hover:underline"
                >
                  Payments
                </Link>
              </li>
              <li>
                <Link
                  href="dashboard/profile"
                  className="text-sky-700 hover:underline"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
