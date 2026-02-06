import { prisma } from "@/lib/prisma"
import { USER_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { handleService } from "@/services/@common/utils"
import { UserContext } from "@/services/user/types"

class UserService {
  getContext(userId: number) {
    return handleService({
      fn: async () => {
        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
          throw new ServiceError(USER_ERROR.USER_NOT_FOUND)
        }
        return { id: user.id, authority: user.authority } satisfies UserContext
      },
      unknownErrorMessage: "회원 정보를 찾을 수 없습니다."
    })
  }
}

export default UserService