import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/db";
import { documents, loans, propertyDetails, users } from "@/lib/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: File): Promise<string> {
  const fileExtension = file.name.split(".").pop();
  const uniqueFilename = `${crypto.randomUUID()}.${fileExtension}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: uniqueFilename,
    Body: buffer,
    ContentType: file.type,
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFilename}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const userId = Number(formData.get("userId"));
    console.log(userId);
    if (!userId || isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Verify that the user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const amount = Number(formData.get("amount"));
    const repaymentPeriod = Number(formData.get("repaymentPeriod"));
    const titleDeedNumber = formData.get("titleDeedNumber") as string;
    const propertyAddress = formData.get("propertyAddress") as string;
    const uploadFile = async (fileKey: string) => {
      const file = formData.get(fileKey) as File | null;
      return file ? await uploadFileToS3(file) : null;
    };

    const identificationDocumentLink = await uploadFile(
      "identificationDocument"
    );
    const powerOfAttorneyLink = await uploadFile("powerOfAttorney");
    const titleDeedLink = await uploadFile("titleDeed");

    const newLoan = await db.transaction(async (tx) => {
      const [loan] = await tx
        .insert(loans)
        .values({
          userId,
          amount,
          repaymentPeriod,
          status: "PENDING",
        } as any)
        .returning();

      await tx.insert(propertyDetails).values({
        loanId: loan.id,
        titleDeedNumber,
        propertyAddress,
      });

      await tx.insert(documents).values({
        loanId: loan.id,
        identificationDocumentLink,
        powerOfAttorneyLink,
        titleDeedLink,
      });

      return loan;
    });

    // Fetch the complete loan data with relations
    const completeLoan = await db.query.loans.findFirst({
      where: eq(loans.id, newLoan.id),
      with: {
        propertyDetails: true,
        documents: true,
      },
    });

    return NextResponse.json(completeLoan, { status: 201 });
  } catch (error) {
    console.error("Error creating loan:", error);
    return NextResponse.json(
      { message: "Error creating loan", error: String(error) },
      { status: 500 }
    );
  }
}
