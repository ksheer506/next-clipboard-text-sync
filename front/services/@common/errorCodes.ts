import { createServiceError } from "@/services/@common/utils";

export const INTERNAL_ERROR = {
  UNKNOWN: createServiceError("INTERNAL", 1, "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."),
}

export const USER_ERROR = {
  /* 회원가입 */
  EMAIL_ALREADY_REGISTERED: createServiceError("USER", 1, "이미 사용 중인 이메일입니다."),

  /* 로그인 */
  USER_NOT_FOUND: createServiceError("USER", 2, "해당 이메일로 가입된 사용자가 없습니다."),
  INVALID_PASSWORD: createServiceError("USER", 3, "비밀번호가 일치하지 않습니다."),
  EMPTY_EMAIL_OR_PASSWORD: createServiceError("USER", 4, "이메일 또는 비밀번호가 입력되지 않았습니다."),

  /* 인증 */
  NO_AUTHENTICATION: createServiceError("USER", 5, "사용자 정보가 없습니다. 다시 로그인해주세요."),

  /* 권한 */
  NO_AUTHORITY: createServiceError("USER", 6, "권한이 없습니다."),
  NO_FILE_AUTHORITY: createServiceError("USER", 7, "파일 공유 권한이 없습니다."),
} as const;

export const DEVICE_ERROR = {
  DEVICE_NOT_FOUND: createServiceError("DEVICE", 1, "등록되지 않는 디바이스입니다."),
}