import { Sidebar } from "@/components/Sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <main className="flex-1 p-4 lg:p-8 overflow-auto pb-16 lg:pb-8">
        <React.Fragment>{children}</React.Fragment>
      </main>
    </div>
  );
}
