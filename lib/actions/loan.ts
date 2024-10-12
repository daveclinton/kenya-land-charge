import { db } from "@/lib/db";
import { loans, propertyDetails, documents } from "@/lib/db/schema";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type FormData = {
  amount: number;
  repaymentPeriod: number;
  titleDeedNumber: string;
  propertyAddress: string;
  identificationDocument: FileList | null;
  powerOfAttorney: FileList | null;
  titleDeed: FileList | null;
};

async function uploadFileToS3(file: File, key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: (await file.arrayBuffer()) as any,
    ContentType: file.type,
  });

  await s3Client.send(command);
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function handleLoanApplication(
  data: FormData,
  userId: number
): Promise<{ success: boolean; message: string }> {
  try {
    const [loanRecord] = await db
      .insert(loans)
      .values({
        id: undefined as any,
        userId: BigInt(userId) as any,
        amount: data.amount.toString(),
        repaymentPeriod: data.repaymentPeriod,
        status: "PENDING",
      })
      .returning();

    if (!loanRecord) {
      throw new Error("Failed to create loan record");
    }

    await db.insert(propertyDetails).values({
      id: undefined as any,
      loanId: loanRecord.id,
      titleDeedNumber: data.titleDeedNumber,
      propertyAddress: data.propertyAddress,
    });

    const documentLinks = {
      identificationDocumentLink: "",
      powerOfAttorneyLink: "",
      titleDeedLink: "",
    };

    if (data.identificationDocument && data.identificationDocument[0]) {
      documentLinks.identificationDocumentLink = await uploadFileToS3(
        data.identificationDocument[0],
        `loan_${
          loanRecord.id
        }/identification_${uuidv4()}.${data.identificationDocument[0].name
          .split(".")
          .pop()}`
      );
    }

    if (data.powerOfAttorney && data.powerOfAttorney[0]) {
      documentLinks.powerOfAttorneyLink = await uploadFileToS3(
        data.powerOfAttorney[0],
        `loan_${
          loanRecord.id
        }/power_of_attorney_${uuidv4()}.${data.powerOfAttorney[0].name
          .split(".")
          .pop()}`
      );
    }

    if (data.titleDeed && data.titleDeed[0]) {
      documentLinks.titleDeedLink = await uploadFileToS3(
        data.titleDeed[0],
        `loan_${loanRecord.id}/title_deed_${uuidv4()}.${data.titleDeed[0].name
          .split(".")
          .pop()}`
      );
    }

    await db.insert(documents).values({
      id: undefined as any,
      loanId: loanRecord.id,
      ...documentLinks,
    });

    return {
      success: true,
      message: "Loan application submitted successfully",
    };
  } catch (error) {
    console.error("Error in handleLoanApplication:", error);
    return { success: false, message: "Failed to submit loan application" };
  }
}
