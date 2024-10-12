import { NextRequest, NextResponse } from "next/server";
import { handleLoanApplication } from "@/lib/actions/loan";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const userId = formData.get("userId");

  const data = {
    amount: Number(formData.get("amount")),
    repaymentPeriod: Number(formData.get("repaymentPeriod")),
    titleDeedNumber: formData.get("titleDeedNumber") as string,
    propertyAddress: formData.get("propertyAddress") as string,
    identificationDocument: formData.get(
      "identificationDocument"
    ) as File | null,
    powerOfAttorney: formData.get("powerOfAttorney") as File | null,
    titleDeed: formData.get("titleDeed") as File | null,
  };

  try {
    const result = await handleLoanApplication(data as any, userId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in loan application:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
