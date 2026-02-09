export interface Logger {
  log: (...message: unknown[]) => void
  warn: (...message: unknown[]) => void
  error: (...message: unknown[]) => void
}
