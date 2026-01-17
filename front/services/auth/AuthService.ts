import "server-only";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

import ServiceError from "@/services/@common/ServiceError";
import { USER_ERROR } from "@/services/@common/errorCodes";
import { SignUpRequest, SignInRequest } from "@/services/auth/request";
import { sha256, signAccessToken, signRefreshToken } from "@/services/auth/utils";
import { handleService } from "@/services/@common/utils";
import { REFRESH_TOKEN_EXPIRATION_DAY } from "@/services/auth/const";

class AuthService {
  async signUp(request: SignUpRequest) {
    return handleService({
      fn: async () => {
        const isExist = await prisma.user.findUnique({ where: { email: request.email } })

        if (isExist) {
          throw new ServiceError(USER_ERROR.EMAIL_ALREADY_REGISTERED)
        }
        const { passwordConfirm, ...rest } = request
        const hashed = await bcrypt.hash(request.password, 10)
        const { password, ...user } = await prisma.user.create({ data: { ...rest, password: hashed } })

        return user
      },
      unknownErrorMessage: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
    })
  }

  async signIn(request: SignInRequest) {
    return handleService({
      fn: async () => {
        if (!request.email || !request.password) {
          throw new ServiceError(USER_ERROR.EMPTY_EMAIL_OR_PASSWORD)
        }
        const user = await prisma.user.findUnique({ where: { email: request.email } })

        if (!user) {
          throw new ServiceError(USER_ERROR.USER_NOT_FOUND)
        }
        const isPasswordValid = await bcrypt.compare(request.password, user.password)

        if (!isPasswordValid) {
          throw new ServiceError(USER_ERROR.INVALID_PASSWORD)
        }
        const payload = { id: user.id, email: user.email, name: user.name }
        const accessToken = signAccessToken(payload)
        const refreshToken = signRefreshToken(payload)

        await prisma.refreshToken.create({
          data: {
            token: sha256(refreshToken),
            userId: user.id,
            createdAt: new Date(),
            expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * REFRESH_TOKEN_EXPIRATION_DAY)
          }
        })

        return { user: payload, accessToken, refreshToken }
      },
      unknownErrorMessage: "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
    })
  }

  async signOut(refreshToken: string) {
    return handleService({
      fn: async () => {
        const { count } = await prisma.refreshToken.deleteMany({ where: { token: sha256(refreshToken) } })

        /* 해당 토큰이 없거나 정상적으로 삭제된 경우 */
        if (count >= 0) {
          return { ok: true }
        }
        return { ok: false }
      },
      unknownErrorMessage: "로그아웃 중 오류가 발생했습니다. 다시 시도해주세요."
    })
  }
}

export default AuthService