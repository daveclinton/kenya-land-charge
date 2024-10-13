import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loans, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const allLoans = await db
      .select({
        id: loans.id,
        userId: loans.userId,
        amount: loans.amount,
        repaymentPeriod: loans.repaymentPeriod,
        status: loans.status,
        createdAt: loans.createdAt,
        userFullName: users.fullName,
      })
      .from(loans)
      .leftJoin(users, eq(loans.userId, users.id));
    return NextResponse.json(allLoans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    return NextResponse.json(
      { message: "Error fetching loans" },
      { status: 500 }
    );
  }
}
