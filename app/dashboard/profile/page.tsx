"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";
const mockUser = {
  first_name: "John",
  last_name: "Doe",
  date_of_birth: "1990-01-01",
  phone_number: "+1234567890",
  address: "123 Main St, Anytown, USA",
  email: "john.doe@example.com",
  role: "user",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"info" | "password" | null>(null);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-sky-900">
              Your Profile Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
          <p className="text-sky-700 mb-8">
            Manage your personal information, update your password, and keep
            your account secure.
          </p>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 bg-sky-600 text-white">
              <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
              <p className="mb-2">
                <span className="font-medium">Email:</span> {mockUser.email}
              </p>
              <p>
                <span className="font-medium">Account Type:</span>{" "}
                {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
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
              {activeTab && (
                <ProfileForm initialData={mockUser} activeTab={activeTab} />
              )}
              {!activeTab && (
                <p className="text-sky-700 text-center">
                  Select an option above to update your profile or change your
                  password.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
