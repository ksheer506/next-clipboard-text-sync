import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import ServiceError from "@/services/@common/ServiceError";
import { USER_ERROR } from "@/services/@common/errorCodes";
import { SignUpRequest, SignInRequest } from "@/services/user/request";
import { signAccessToken, signRefreshToken } from "@/services/user/utils";
import { handleService } from "@/services/@common/utils";

class UserService {
  async signUp(request: SignUpRequest) {
    return handleService({
      fn: async () => {
        const isExist = await prisma.user.findUnique({ where: { email: request.email } })

        if (isExist) {
          throw new ServiceError(USER_ERROR.EMAIL_ALREADY_REGISTERED, "이미 사용 중인 이메일입니다.")
        }
        const hashed = await bcrypt.hash(request.password, 10)
        const { password, ...user } = await prisma.user.create({ data: { ...request, password: hashed } })

        return user
      },
      unknownErrorMessage: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
    })
  }

  async signIn(request: SignInRequest) {
    return handleService({
      fn: async () => {
        const user = await prisma.user.findUnique({ where: { email: request.email } })

        if (!user) {
          throw new ServiceError(USER_ERROR.USER_NOT_FOUND, "가입된 이메일이 없습니다.")
        }
        const isPasswordValid = await bcrypt.compare(request.password, user.password)

        if (!isPasswordValid) {
          throw new ServiceError(USER_ERROR.INVALID_PASSWORD, "비밀번호가 일치하지 않습니다.")
        }
        const payload = { id: user.id, email: user.email, name: user.name }
        const accessToken = signAccessToken(payload)
        const refreshToken = signRefreshToken(payload)
        await prisma.user.update({ where: { id: user.id }, data: { refreshToken } })

        return { user: payload, accessToken, refreshToken }
      },
      unknownErrorMessage: "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
    })
  }
}

export default UserService