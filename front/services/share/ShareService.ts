import { ShareItemType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { withServiceError } from "@/services/@common/utils";
import { FILE_EXPIRE_TIME_MS, TEXT_EXPIRE_TIME_MS } from "@/services/share/const";
import { UploadTextRequest } from "@/services/share/type";
import { getExpireDate } from "@/services/share/utils";
import { UserContext } from "@/services/user/types";

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

  uploadFile(userContext: UserContext, file: File) {
    /* return withServiceError(async () => {
      return await prisma.sharableItem.create({
        data: {
          userId: userContext.id,
          deviceId: deviceConText.id,
          type: ShareItemType.FILE,
          file: file,
          expiresAt: getExpireDate(FILE_EXPIRE_TIME_MS),
          isDeleted: false,
        }
      })
    }) */
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
