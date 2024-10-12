import { QuickApplySection } from "@/components/QuickApply";
import { RecentLoanActivity } from "@/components/RecentActivity";
import LoanSummary from "@/components/features/LoanSummary";
import React from "react";

export default async function Dashboard() {
  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row mb-10 gap-5 ">
        <QuickApplySection />
        <LoanSummary />
      </div>
      <RecentLoanActivity />
    </React.Fragment>
  );
}
