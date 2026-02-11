interface ServiceErrorPayload {
  code: string
  message: string
}

class ServiceError extends Error {
  code: string
  message: string

  constructor({ code, message }: ServiceErrorPayload) {
    super(message)
    this.code = code
    this.message = message
  }

  static isError(err: unknown): err is ServiceError {
    if (err instanceof ServiceError) {
      return true
    }
    return typeof err === "object" && !!err && "code" in err && "message" in err
  }

  static codeOf(error: ServiceErrorPayload, code: string | undefined) {
    return error.code === code
  }
}

export default ServiceError