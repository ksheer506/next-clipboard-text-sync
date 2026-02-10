import { ShareAuthority, ShareItemType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { USER_ERROR } from "@/services/@common/errorCodes";
import ServiceError from "@/services/@common/ServiceError";
import { withServiceError } from "@/services/@common/utils";
import { FILE_EXPIRE_TIME_MS, TEXT_EXPIRE_TIME_MS } from "@/services/share/const";
import { createPutCommand, R2 } from "@/services/share/r2Client";
import { UploadFileRequest, UploadTextRequest } from "@/services/share/type";
import { getExpireDate } from "@/services/share/utils";
import { v4 as uuidv4 } from "uuid";

class ShareService {
  uploadText(request: UploadTextRequest) {
    return withServiceError(async () => {
      const { text, userContext, deviceContext: deviceConText } = request

      return await prisma.sharableItem.create({
        data: {
          userId: userContext.id,
          deviceId: deviceConText.id,
          type: ShareItemType.TEXT,
          content: text,
          expiresAt: getExpireDate(TEXT_EXPIRE_TIME_MS),
          isDeleted: false,
        }
      })
    })
  }

  uploadFile(request: UploadFileRequest) {
    return withServiceError(async () => {
      const { file, userContext, deviceContext } = request

      if (userContext.authority === ShareAuthority.TEXT_ONLY) {
        throw new ServiceError(USER_ERROR.NO_FILE_AUTHORITY)
      }
      const extension = file.name.split(".").pop()
      const fileKey = `share-hub/${userContext.id}/${uuidv4()}.${extension}`
      const metadata = {
        userId: userContext.id,
        deviceId: deviceContext.deviceId,
      }

      await R2.send(createPutCommand({
        contentType: file.type,
        body: Buffer.from(await file.arrayBuffer()),
        key: fileKey,
        metadata: metadata,
      }))
      await prisma.sharableItem.create({
        data: {
          userId: userContext.id,
          deviceId: deviceContext.deviceId,
          type: ShareItemType.FILE,
          fileUrl: `/${fileKey}`,
          expiresAt: getExpireDate(FILE_EXPIRE_TIME_MS),
          isDeleted: false,
        }
      })
    })
  }

  getHistory(userId: number) {
    return withServiceError(async () => {
      return await prisma.sharableItem.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      })
    })
  }
}

export default ShareService;
