import { createServiceError } from "@/services/@common/utils";

export const INTERNAL_ERROR = {
  UNKNOWN: createServiceError("INTERNAL", 1, "알 수 없는 오류가 발생했습니다. 다시 시도해주세요."),
}

export const USER_ERROR = {
  /* 회원가입 */
  EMAIL_ALREADY_REGISTERED: createServiceError("USER", 1, "이미 사용 중인 이메일입니다."),

  /* 로그인 */
  USER_NOT_FOUND: createServiceError("USER", 2, "해당 이메일로 가입된 사용자가 없습니다."),
  INVALID_PASSWORD: createServiceError("USER", 3, "비밀번호가 일치하지 않습니다."),
} as const;
