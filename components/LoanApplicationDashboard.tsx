"use client";
import React from "react";
import DashboardOverview from "./features/DashBoardOverview";
import LoanSummary from "./features/LoanSummary";
import LoanApplicationForm from "./LoanApplicationForm";

const LoanApplicationDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Loan Dashboard</h1>
      <DashboardOverview />
      <LoanSummary />
      <LoanApplicationForm />
    </div>
  );
};

export default LoanApplicationDashboard;
