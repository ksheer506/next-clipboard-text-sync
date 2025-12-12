import { createServiceErrorCode } from "@/services/@common/utils";

export const INTERNAL_ERROR = {
  UNKNOWN: createServiceErrorCode("INTERNAL", 1),
}

export const USER_ERROR = {
  /* 회원가입 */
  EMAIL_ALREADY_REGISTERED: createServiceErrorCode("USER", 1),

  /* 로그인 */
  USER_NOT_FOUND: createServiceErrorCode("USER", 2),
  INVALID_PASSWORD: createServiceErrorCode("USER", 3),
} as const;
