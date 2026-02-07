import { Device } from "@/generated/prisma/client"
import { UserContext } from "@/services/user/types"

export interface UploadTextRequest {
  text: string
  userContext: UserContext
  deviceContext: Device
}