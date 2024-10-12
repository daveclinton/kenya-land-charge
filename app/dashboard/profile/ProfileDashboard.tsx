"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";

interface User {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
}

interface ProfileDashboardProps {
  user: User;
}

export default function ProfileDashboard({ user }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "password" | null>(null);

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-sky-600 text-white">
        <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
        <p className="mb-2">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Account Type:</span>{" "}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>
      <div className="p-8">
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "info"
                ? "bg-sky-100 text-sky-800"
                : "bg-sky-200 text-sky-600"
            }`}
          >
            Update Personal Info
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-4 py-2 rounded-t-lg ml-2 ${
              activeTab === "password"
                ? "bg-sky-100 text-sky-800"
                : "bg-sky-200 text-sky-600"
            }`}
          >
            Change Password
          </button>
        </div>
        {activeTab && <ProfileForm initialData={user} activeTab={activeTab} />}
        {!activeTab && (
          <p className="text-sky-700 text-center">
            Select an option above to update your profile or change your
            password.
          </p>
        )}
      </div>
    </div>
  );
}
