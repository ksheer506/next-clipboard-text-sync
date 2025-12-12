export interface Logger {
  log: (...message: unknown[]) => void
  warn: (...message: unknown[]) => void
  error: (...message: unknown[]) => void
}

export interface ServiceHandlerOptions<D> {
  fn: () => Promise<D>
  unknownErrorMessage?: string
}