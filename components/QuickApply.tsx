"use client";
import { Card, CardContent } from "@/components/ui/card";
import { userStore } from "@/lib/store/useStore";
import { ApplyLoanForm } from "./ApplyLoan";
import React from "react";
import LoanSummary from "./features/LoanSummary";
import { RecentLoanActivity } from "./RecentActivity";

export function QuickApplySection() {
  const user = userStore((state) => state.user);

  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row mb-10 gap-5 ">
        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-900">
              Quick Loan Application
            </h2>
            <p className="mb-4 text-sky-700">
              Need a loan? Start your application process quickly and easily.
            </p>
            <ApplyLoanForm userId={user?.id} />
          </CardContent>
        </Card>
        <LoanSummary />
      </div>
      <RecentLoanActivity userId={user?.id} />
    </React.Fragment>
  );
}
