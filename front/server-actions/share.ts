"use server"

import { getAuthenticatedUser } from "@/lib/auth"
import { USER_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import DeviceService from "@/services/device/DeviceService"
import ShareService from "@/services/share/ShareService"
import UserService from "@/services/user/UserService"

interface UploadTextPayload {
  form: FormData
  deviceId: string
}

interface UploadFilePayload {
  form: FormData
  deviceId: string
}

export const uploadText = async (state: unknown, payload: UploadTextPayload) => {
  const { form, deviceId } = payload
  const text = (form.get("content") || "") as string
  const user = await getAuthenticatedUser()

  try {
    if (!user) {
      throw new ServiceError(USER_ERROR.NO_AUTHORITY)
    }
    if (!text) {
      return { ok: false, field: "content", message: "공유할 텍스트를 입력해주세요." }
    }
    const userContext = await new UserService().getContext(user.id)
    const deviceContext = await new DeviceService().getContext(user.id, deviceId)
    const res = await new ShareService().uploadText({ text, userContext, deviceContext })

    return { ok: true, message: "텍스트 공유에 성공하였습니다." }
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

export const uploadFile = async (state: unknown, payload: UploadFilePayload) => {
  const { form, deviceId } = payload
  const file = form.get("file") as File | null
  const user = await getAuthenticatedUser()

  try {
    if (!user) {
      throw new ServiceError(USER_ERROR.NO_AUTHORITY)
    }
    if (!file) {
      return { ok: false, field: "file", message: "공유할 파일을 선택해주세요." }
    }
    const userContext = await new UserService().getContext(user.id)
    const deviceContext = await new DeviceService().getContext(user.id, deviceId)
    const res = await new ShareService().uploadFile({ file, userContext, deviceContext })

    return { ok: true, message: "파일 공유에 성공하였습니다." }
  } catch (e) {
    if (ServiceError.isError(e)) {
      return { ok: false, message: e.message }
    }
    return { ok: false, message: "파일 공유에 실패하였습니다. 다시 시도해주세요." }
  }
}
