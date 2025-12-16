class ServiceError extends Error {
  code: string
  message: string

  constructor({ code, message }: { code: string, message: string }) {
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
}

export default ServiceError