import { ShareItemType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { TEXT_EXPIRE_TIME_MS } from "@/services/share/const";
import { UploadTextRequest } from "@/services/share/type";
import { getExpireDate } from "@/services/share/utils";
import { UserContext } from "@/services/user/types";

class ShareService {
  async uploadText(request: UploadTextRequest) {
    const { text, userContext, deviceContext: deviceConText } = request

    const res = await prisma.sharableItem.create({
      data: {
        userId: userContext.id,
        deviceId: deviceConText.id,
        type: ShareItemType.TEXT,
        content: text,
        expiresAt: getExpireDate(TEXT_EXPIRE_TIME_MS),
        isDeleted: false,
      }
    })
  }

  async uploadFile(userContext: UserContext, file: File) {}
}

export default ShareService;
