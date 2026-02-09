import { INTERNAL_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"

export const createServiceError = (domain: string, code: number, message: string) => ({
  code: `ERROR: ${domain.toUpperCase()}_${code.toString().padStart(4, "0")}`,
  message: message,
})

export const withServiceError = async <D>(fn: () => Promise<D>) => {
  try {
    return await fn()
  } catch (e) {
    if (ServiceError.isError(e)) {
      throw e
    }
    console.error(e)
    throw new ServiceError(INTERNAL_ERROR.UNKNOWN)
  }
}
