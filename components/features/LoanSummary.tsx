import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-2xl font-bold">Loan Summary</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-sky-100 hover:text-sky-700 h-10 py-2 px-4">
                <TrendingUp className="h-4 w-4 mr-2 text-sky-500" />
                View Details
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View detailed loan information</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryItem
            icon={<PieChart className="h-6 w-6 text-sky-500" />}
            label="Total Loans"
            value="3"
            subtext="2 active, 1 paid off"
          />
          <SummaryItem
            icon={<CreditCard className="h-6 w-6 text-sky-500" />}
            label="Active Loans"
            value="2"
            subtext="1 personal, 1 auto"
          />
          <SummaryItem
            icon={<Banknote className="h-6 w-6 text-sky-500" />}
            label="Total Amount"
            value="$25,000"
            subtext="$18,500 remaining"
          />
          <SummaryItem
            icon={<Calendar className="h-6 w-6 text-sky-500" />}
            label="Next Payment Due"
            value="15 days"
            subtext="$500 due"
          />
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Repayment Progress</h4>
            <span className="text-sm font-medium text-muted-foreground">
              $6,500 / $25,000
            </span>
          </div>
          <Progress value={26} className="h-2 w-full bg-sky-100" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>26% of total loan amount repaid</span>
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-sky-500" />
              18,500 remaining
            </span>
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg bg-card border">
      <div className="flex-shrink-0 p-2 bg-sky-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{subtext}</p>
      </div>
    </div>
  );
}
