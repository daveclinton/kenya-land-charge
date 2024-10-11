import config from "./config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: config.s3.region,
  credentials: config.s3.credentials,
});

export async function uploadToS3(file: File, key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: file.type,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  // Upload file using the signed URL
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
  // Return the URL of the uploaded file
  return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
}
