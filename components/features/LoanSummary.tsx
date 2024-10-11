import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote, CreditCard, Calendar, PieChart } from "lucide-react";

export default function LoanSummary() {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-2xl font-bold">Loan Summary</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryItem
            icon={<PieChart className="h-6 w-6 text-primary" />}
            label="Total Loans"
            value="3"
            subtext="2 active, 1 paid off"
          />
          <SummaryItem
            icon={<CreditCard className="h-6 w-6 text-primary" />}
            label="Active Loans"
            value="2"
            subtext="1 personal, 1 auto"
          />
          <SummaryItem
            icon={<Banknote className="h-6 w-6 text-primary" />}
            label="Total Amount"
            value="$25,000"
            subtext="$18,500 remaining"
          />
          <SummaryItem
            icon={<Calendar className="h-6 w-6 text-primary" />}
            label="Next Payment Due"
            value="15 days"
            subtext="$500 due"
          />
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-2">Repayment Progress</h4>
          <Progress value={26} className="h-2 w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            26% of total loan amount repaid
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryItem({ icon, label, value, subtext }: any) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg bg-card">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{subtext}</p>
      </div>
    </div>
  );
}
