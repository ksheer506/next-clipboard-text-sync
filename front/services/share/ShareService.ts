import { ShareItemType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { TEXT_EXPIRE_TIME_MS } from "@/services/share/const";
import { getExpireDate } from "@/services/share/utils";
import { UserContext } from "@/services/user/types";

class ShareService {
  async uploadText(userContext: UserContext, text: string) {
    const res = await prisma.sharableItem.create({
      data: {
        userId: userContext.id,
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
