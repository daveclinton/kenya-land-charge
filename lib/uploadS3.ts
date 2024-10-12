import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3Client = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToS3(file: File): Promise<string> {
  // Generate a unique filename
  const fileExtension = file.name.split(".").pop();
  const uniqueFilename = `${crypto.randomUUID()}.${fileExtension}`;

  // Set up the parameters for S3 upload
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: uniqueFilename,
    ContentType: file.type,
  };

  try {
    // Create a pre-signed URL for uploading
    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    // Upload the file using the pre-signed URL
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to S3");
    }

    // Construct and return the URL of the uploaded file
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${uniqueFilename}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}
