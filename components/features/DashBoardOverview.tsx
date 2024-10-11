import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import LoanHistoryChart from "./LoanHistory";
import CreditScoreChart from "./CreditScore";

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Loan History</h3>
        </CardHeader>
        <CardContent>
          <LoanHistoryChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Credit Score Distribution</h3>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <CreditScoreChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
