import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader({
  user,
}: {
  user: { fullName: string; email: string };
}) {
  return (
    <header className="bg-white sticky p-5 top-0 z-50 mb-5 rounded-md w-full border-b border-sky-200">
      <div className="container flex h-10 items-center justify-between">
        <h1 className="text-xl font-semibold text-sky-900">Dashboard</h1>
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
          <Tabs
            defaultValue="overview"
            className="hidden lg:block w-full lg:w-auto"
          >
            <TabsList>
              <TabsTrigger value="overview" className="text-sky-700">
                Overview
              </TabsTrigger>
              <TabsTrigger value="applications" className="text-sky-700">
                Applications
              </TabsTrigger>
              <TabsTrigger value="payments" className="text-sky-700">
                Payments
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-sky-700">
                Profile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  );
}
