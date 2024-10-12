import { loans, propertyDetails, documents, users } from "@/lib/db/schema";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { eq, or } from "drizzle-orm";

const s3Client = new S3Client({
  region: process.env.S3_BUCKET_REGION!,
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
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${key}`;
}

export async function handleLoanApplication(
  data: FormData,
  userId: number
): Promise<{ success: boolean; message: string }> {
  // if (typeof userId !== "number" || isNaN(userId)) {
  //   return { success: false, message: "Invalid user ID provided." };
  // }

  try {
    const result = await db.transaction(async (tx) => {
      const existingUser = await tx
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (existingUser.length === 0) {
        throw new Error("User does not exist.");
      }

      const [loanRecord] = await tx
        .insert(loans)
        .values({
          userId: userId,
          amount: Number(data.amount),
          repaymentPeriod: Number(data.repaymentPeriod),
          status: "PENDING",
        })
        .returning();

      if (!loanRecord || !loanRecord.id) {
        throw new Error("Failed to create loan record.");
      }

      await tx.insert(propertyDetails).values({
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
        const file = data.identificationDocument[0];
        const fileExtension = file.name.split(".").pop() || "pdf"; // Default to 'pdf' if no extension
        documentLinks.identificationDocumentLink = await uploadFileToS3(
          file,
          `loan_${loanRecord.id}/identification_${uuidv4()}.${fileExtension}`
        );
      }

      if (data.powerOfAttorney && data.powerOfAttorney[0]) {
        const file = data.powerOfAttorney[0];
        const fileExtension = file.name.split(".").pop() || "pdf";
        documentLinks.powerOfAttorneyLink = await uploadFileToS3(
          file,
          `loan_${loanRecord.id}/power_of_attorney_${uuidv4()}.${fileExtension}`
        );
      }

      if (data.titleDeed && data.titleDeed[0]) {
        const file = data.titleDeed[0];
        const fileExtension = file.name.split(".").pop() || "pdf";
        documentLinks.titleDeedLink = await uploadFileToS3(
          file,
          `loan_${loanRecord.id}/title_deed_${uuidv4()}.${fileExtension}`
        );
      }

      await tx.insert(documents).values({
        loanId: loanRecord.id,
        ...documentLinks,
      });

      return {
        success: true,
        message: "Loan application submitted successfully.",
      };
    });

    return result;
  } catch (error: any) {
    console.error("Error in handleLoanApplication:", error.message || error);
    return {
      success: false,
      message: error.message || "Failed to submit loan application.",
    };
  }
}
