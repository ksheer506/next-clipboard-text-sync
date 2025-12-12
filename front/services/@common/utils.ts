import { INTERNAL_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { ServiceHandlerOptions } from "@/services/@common/types"

export const createServiceErrorCode = (category: string, code: number) => `APP_${category.toUpperCase()}_${code.toString().padStart(4, "0")}`

export const handleService = async <T>({ fn, unknownErrorMessage }: ServiceHandlerOptions<T>) => {
  try {
    return await fn()
  } catch (e) {
    if (ServiceError.isError(e)) {
      throw e
    }
    console.error(e)
    throw new ServiceError(INTERNAL_ERROR.UNKNOWN, unknownErrorMessage || "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.")
  }
}
