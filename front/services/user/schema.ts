import z from "zod";
import { hasAlphabet, hasNumber, hasSpecial } from "@/lib/validate";

export const SignUpSchema = z.object({
  email: z.email({ error: "이메일이 형식에 맞지 않습니다." }),
  name: z
    .string()
    .nonempty({ error: "이름을 입력해주세요." })
    .min(2, { error: "이름은 2자 이상이어야 합니다." }),
  password: z
    .string()
    .nonempty({ error: "비밀번호을 입력해주세요." })
    .min(6, { error: "비밀번호는 6자 이상이어야 합니다." })
    .superRefine((v, ctx) => {
      if (hasSpecial(v) && hasAlphabet(v) && hasNumber(v) && v.length < 6) {
        return ctx.addIssue("특수문자+영문+숫자 비밀번호인 경우 6자 이상이어야 합니다.")
      }
      if (hasAlphabet(v) && hasNumber(v) && v.length < 8) {
        return ctx.addIssue("영문+숫자 비밀번호인 경우  8자 이상이어야 합니다.")
      }
      if (!hasAlphabet(v) && hasNumber(v)) {
        return ctx.addIssue("비밀번호는 영문자를 포함해야 합니다.")
      }
    }),
  passwordConfirm: z
    .string()
    .nonempty({ error: "비밀번호 확인을 입력해주세요." }),
}).superRefine((v, ctx) => {
  if (v.password !== v.passwordConfirm) {
    return ctx.addIssue("비밀번호 확인이 일치하지 않습니다.")
  }
})