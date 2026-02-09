import { prisma } from "@/lib/prisma"
import { USER_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { withServiceError } from "@/services/@common/utils"
import { UserContext } from "@/services/user/types"

class UserService {
  getContext(userId: number) {
    return withServiceError(async () => {
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) {
        throw new ServiceError(USER_ERROR.USER_NOT_FOUND)
      }
      return { id: user.id, authority: user.authority } satisfies UserContext
    })
  }
}

export default UserService