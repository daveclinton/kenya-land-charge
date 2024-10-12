import { NextApiRequest, NextApiResponse } from "next";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { db } from "@/lib/db";
import {
  documents,
  loans,
  NewLoan,
  NewPropertyDetail,
  propertyDetails,
} from "@/lib/db/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: formidable.File): Promise<string> {
  const fileContent = await fs.readFile(file.filepath);
  const fileExtension = path.extname(file.originalFilename || "");
  const uniqueFilename = `${crypto.randomUUID()}${fileExtension}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: uniqueFilename,
    Body: fileContent,
    ContentType: file.mimetype || "application/octet-stream",
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFilename}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ message: "Error processing form data" });
    }

    try {
      const userId = Number(fields.userId);
      const amount = Number(fields.amount);
      const repaymentPeriod = Number(fields.repaymentPeriod);
      const titleDeedNumber = fields.titleDeedNumber;
      const propertyAddress = fields.propertyAddress;

      const uploadFile = async (
        file: formidable.File | formidable.File[] | undefined
      ) => {
        if (!file || Array.isArray(file)) return null;
        return await uploadFileToS3(file);
      };

      const identificationDocumentLink = await uploadFile(
        files.identificationDocument
      );
      const powerOfAttorneyLink = await uploadFile(files.powerOfAttorney);
      const titleDeedLink = await uploadFile(files.titleDeed);

      const newLoan = await db.transaction(async (tx) => {
        const loanData: any = {
          userId,
          amount,
          repaymentPeriod,
          status: "PENDING",
        };
        const [loan] = await tx.insert(loans).values(loanData).returning();

        const propertyData: any = {
          loanId: loan.id,
          titleDeedNumber,
          propertyAddress,
        };

        await tx.insert(propertyDetails).values(propertyData);

        await tx.insert(documents).values({
          loanId: loan.id,
          identificationDocumentLink,
          powerOfAttorneyLink,
          titleDeedLink,
        });

        return await tx.query.loans.findFirst({
          where: (loans, { eq }) => eq(loans.id, loan.id),
          with: {
            propertyDetails: true,
            documents: true,
          },
        });
      });

      res.status(201).json(newLoan);
    } catch (error) {
      console.error("Error creating loan:", error);
      res.status(500).json({ message: "Error creating loan" });
    }
  });
}
