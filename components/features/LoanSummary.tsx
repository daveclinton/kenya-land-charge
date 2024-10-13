"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Banknote,
  CreditCard,
  Calendar,
  PieChart,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LoanSummary() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalLoans: "0",
    activeLoans: "0",
    totalAmount: "$0",
    nextPaymentDue: "0 days",
    repaidAmount: "$0",
    totalLoanAmount: "$0",
    remainingAmount: "$0",
    progressValue: 0,
    activeLoansSubtext: "0 active, 0 paid off",
    personalLoansSubtext: "0 personal, 0 auto",
    nextPaymentDueSubtext: "$0 due",
    repaymentProgressSubtext: "0% of total loan amount repaid",
  });

  useEffect(() => {
    setTimeout(() => {
      setData({
        totalLoans: "0",
        activeLoans: "0",
        totalAmount: "$0",
        nextPaymentDue: "0 days",
        repaidAmount: "$0",
        totalLoanAmount: "$0",
        remainingAmount: "$0",
        progressValue: 0,
        activeLoansSubtext: "0 active, 0 paid off",
        personalLoansSubtext: "0 personal, 0 auto",
        nextPaymentDueSubtext: "$0 due",
        repaymentProgressSubtext: "0% of total loan amount repaid",
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-2xl font-bold text-sky-900">Loan Summary</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className=" hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-sky-100 hover:text-sky-700 h-10 py-2 px-4">
                <TrendingUp className="h-4 w-4 mr-2 text-sky-500" />
                View Details
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sky-700">View detailed loan information</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <SummaryItem
            icon={<PieChart className="h-6 w-6 text-sky-500" />}
            label="Total Loans"
            value={loading ? null : data.totalLoans}
            subtext={loading ? null : data.activeLoansSubtext} // Using activeLoansSubtext
            loading={loading}
          />
          <SummaryItem
            icon={<CreditCard className="h-6 w-6 text-sky-500" />}
            label="Active Loans"
            value={loading ? null : data.activeLoans}
            subtext={loading ? null : data.personalLoansSubtext} // Using personalLoansSubtext
            loading={loading}
          />
          <SummaryItem
            icon={<Banknote className="h-6 w-6 text-sky-500" />}
            label="Total Amount"
            value={loading ? null : data.totalAmount}
            subtext={loading ? null : `${data.remainingAmount} remaining`}
            loading={loading}
          />
          <SummaryItem
            icon={<Calendar className="h-6 w-6 text-sky-500" />}
            label="Next Payment Due"
            value={loading ? null : data.nextPaymentDue}
            subtext={loading ? null : data.nextPaymentDueSubtext} // Using nextPaymentDueSubtext
            loading={loading}
          />
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-sky-900">
              Repayment Progress
            </h4>
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span className="text-sm font-medium text-sky-700">
                {data.repaidAmount} / {data.totalLoanAmount}
              </span>
            )}
          </div>
          {loading ? (
            <Skeleton className="h-2 w-full" />
          ) : (
            <Progress
              value={data.progressValue}
              className="h-2 w-full bg-sky-100"
            />
          )}
          <div className="flex items-center justify-between text-sm text-sky-700">
            {loading ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              <span>{data.repaymentProgressSubtext}</span> // Using repaymentProgressSubtext
            )}
            {loading ? (
              <Skeleton className="h-4 w-36" />
            ) : (
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-sky-500" />
                {data.remainingAmount} remaining
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  subtext,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  subtext: string | null;
  loading: boolean;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white border border-sky-200">
      <div className="flex-shrink-0 p-2 bg-sky-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-sky-700">{label}</p>
        {loading ? (
          <Skeleton className="h-8 w-24 mt-1" />
        ) : (
          <p className="text-2xl font-bold text-sky-900">{value}</p>
        )}
        {loading ? (
          <Skeleton className="h-4 w-32 mt-1" />
        ) : (
          <p className="text-sm text-sky-700">{subtext}</p>
        )}
      </div>
    </div>
  );
}
