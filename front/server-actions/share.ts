"use server"

import { getAuthenticatedUser } from "@/lib/auth"
import { USER_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import ShareService from "@/services/share/ShareService"

export const uploadText = async (state: unknown, form: FormData) => {
  const text = (form.get("text") || "") as string
  const user = await getAuthenticatedUser()

  try {
    if (!user) {
      throw new ServiceError(USER_ERROR.NO_AUTHORITY)
    }
    /* if (!file) {
      throw new ServiceError()
    } */
    const res = await new ShareService().uploadText(user.id, text)
  } catch (e) {
    /* if (isRedirectError(e)) {
      throw e
    } */
    if (ServiceError.isError(e)) {
      return { ok: false, message: e.message }
    }
    return { ok: false, message: "텍스트 공유에 실패하였습니다. 다시 시도해주세요." }
  }
}