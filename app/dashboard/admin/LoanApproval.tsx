"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, DollarSign } from "lucide-react";

interface Loan {
  id: number;
  userId: number;
  userFullName: string;
  amount: number | string;
  repaymentPeriod: string;
  status: "PENDING" | "APPROVED" | "DISBURSED";
  createdAt: string;
}

export default function LoanApprovalDashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch("/api/loans");
      if (!response.ok) throw new Error("Failed to fetch loans");
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      alert("Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (loanId: number) => {
    try {
      const response = await fetch(`/api/loans/${loanId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to approve loan");
      alert("Loan approved successfully");
      fetchLoans();
    } catch (error) {
      console.error("Error approving loan:", error);
      alert("Failed to approve loan");
    }
  };

  const handleDisbursed = async (loanId: number) => {
    try {
      const response = await fetch(`/api/loans/${loanId}/disburse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to mark loan as disbursed");
      alert("Loan marked as disbursed");
      fetchLoans();
    } catch (error) {
      console.error("Error marking loan as disbursed:", error);
      alert("Failed to mark loan as disbursed");
    }
  };

  const getStatusBadge = (status: Loan["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>;
      case "APPROVED":
        return <Badge variant="outline">Approved</Badge>;
      case "DISBURSED":
        return <Badge variant="default">Disbursed</Badge>;
      default:
        return null;
    }
  };

  const formatAmount = (amount: number | string) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return isNaN(numAmount) ? "Invalid Amount" : `KES ${numAmount.toFixed(2)}`;
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <h2 className="text-3xl font-bold text-center">
          Loan Approval Dashboard
        </h2>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">
                    Customer Name
                  </TableHead>
                  <TableHead>Requested Amount</TableHead>
                  <TableHead>Repayment Period</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Created At
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="hidden sm:table-cell">
                      {loan.userFullName}
                    </TableCell>
                    <TableCell>{formatAmount(loan.amount)}</TableCell>
                    <TableCell>{loan.repaymentPeriod} months</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getStatusBadge(loan.status)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(loan.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {loan.status === "PENDING" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(loan.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                      )}
                      {loan.status === "APPROVED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDisbursed(loan.id)}
                        >
                          <DollarSign className="mr-2 h-4 w-4" />
                          Disburse
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
