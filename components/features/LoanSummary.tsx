import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const LoanSummary = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h3 className="text-lg font-semibold">Loan Summary</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Loans</p>
            <p className="text-xl font-bold">3</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Loans</p>
            <p className="text-xl font-bold">2</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold">$25,000</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Payment Due</p>
            <p className="text-xl font-bold">15 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanSummary;
