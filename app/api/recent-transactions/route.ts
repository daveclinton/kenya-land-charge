import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eq, desc, sql } from "drizzle-orm";
import { loans, repayments } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const recentTransactions = await db
      .select({
        id: loans.id,
        type: sql<string>`CASE 
          WHEN ${loans.status} = 'PENDING' THEN 'Application Submitted'
          WHEN ${loans.status} = 'APPROVED' THEN 'Loan Approved'
          WHEN ${loans.status} = 'DISBURSED' THEN 'Loan Disbursed'
          ELSE 'Loan Updated'
        END`.as("type"),
        amount: loans.amount,
        status: loans.status,
        createdAt: loans.createdAt,
      })
      .from(loans)
      .where(eq(loans.userId, parseInt(userId)))
      .union(
        db
          .select({
            id: repayments.id,
            type: sql<string>`'Payment Made'`.as("type"),
            amount: repayments.amount,
            status: sql<string>`'COMPLETED'`.as("status"),
            createdAt: repayments.paymentDate,
          })
          .from(repayments)
          .innerJoin(loans, eq(repayments.loanId, loans.id))
          .where(eq(loans.userId, parseInt(userId)))
      )
      .orderBy(desc(loans.createdAt))
      .limit(5);

    return NextResponse.json(recentTransactions);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    return NextResponse.json(
      { message: "Error fetching recent transactions" },
      { status: 500 }
    );
  }
}
