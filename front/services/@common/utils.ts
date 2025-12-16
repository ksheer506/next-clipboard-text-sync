import { INTERNAL_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { ServiceHandlerOptions } from "@/services/@common/types"

export const createServiceError = (category: string, code: number, message: string) => ({
  code: `APP_${category.toUpperCase()}_${code.toString().padStart(4, "0")}`,
  message: message,
})

export const handleService = async <T>({ fn, unknownErrorMessage }: ServiceHandlerOptions<T>) => {
  try {
    return await fn()
  } catch (e) {
    if (ServiceError.isError(e)) {
      throw e
    }
    console.error(e)
    throw new ServiceError({
      ...INTERNAL_ERROR.UNKNOWN,
      message: unknownErrorMessage || INTERNAL_ERROR.UNKNOWN.message
    })
  }
}
