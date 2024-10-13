import { db } from "@/lib/db";
import { loans } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST({ params }: { params: { loanId: string } }) {
  const { loanId } = params;
  try {
    const [updatedLoan] = await db
      .update(loans)
      .set({ status: "DISBURSED", disbursedAt: new Date() })
      .where(eq(loans.id, Number(loanId)))
      .returning();

    if (!updatedLoan) {
      return NextResponse.json({ message: "Loan not found" }, { status: 404 });
    }
    return NextResponse.json(updatedLoan);
  } catch (error) {
    console.log("Error disbursing loan:", error);
    return NextResponse.json(
      { message: "Error disbursing loan" },
      { status: 500 }
    );
  }
}
