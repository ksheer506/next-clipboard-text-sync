import { R2PutPayload } from "@/services/share/type";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const R2 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUD_FLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUD_FLARE_R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUD_FLARE_R2_SECRET_ACCESS_KEY as string,
  },
})

export const createPutCommand = (payload: R2PutPayload) => new PutObjectCommand({
  Bucket: process.env.CLOUD_FLARE_R2_BUCKET_NAME as string,
  Key: payload.key,
  Body: payload.body,
  ContentType: payload.contentType || "application/octet-stream",
  Metadata: {
    userId: payload.metadata.userId.toString(),
    deviceId: payload.metadata.deviceId,
  },
})