import { Device } from "@/generated/prisma/client"
import { UserContext } from "@/services/user/types"

export interface UploadTextRequest {
  text: string
  userContext: UserContext
  deviceContext: Device
}

export interface UploadFileRequest {
  file: File
  userContext: UserContext
  deviceContext: Device
}

export interface FileMetadata {
  userId: number
  deviceId: string
}

export interface R2PutPayload {
  contentType: string
  body: Buffer
  key: string
  metadata: FileMetadata
}