import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loans } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: { loanId: string } }
) {
  const loanId = params.loanId;

  if (!loanId) {
    return NextResponse.json(
      { message: "Loan ID is required" },
      { status: 400 }
    );
  }

  try {
    const [updatedLoan] = await db
      .update(loans)
      .set({ status: "DISBURSED", approvedAt: new Date() })
      .where(eq(loans.id, Number(loanId)))
      .returning();

    if (!updatedLoan) {
      return NextResponse.json({ message: "Loan not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLoan);
  } catch (error) {
    console.error("Error approving loan:", error);
    return NextResponse.json(
      { message: "Error approving loan" },
      { status: 500 }
    );
  }
}
