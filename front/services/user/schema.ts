import z from "zod";
import { hasAlphabet, hasNumber, hasSpecial } from "@/lib/validate";

export const SignUpSchema = z.object({
  email: z.email(),
  name: z.string().min(2),
  password: z.string().min(8).superRefine((v, ctx) => {
    if (hasSpecial(v) && hasAlphabet(v) && hasNumber(v) && v.length < 6) {
      return ctx.addIssue("특수문자+영문+숫자 비밀번호인 경우 6자 이상이어야 합니다.")
    }
    if (hasAlphabet(v) && hasNumber(v) && v.length < 8) {
      return ctx.addIssue("영문+숫자 비밀번호인 경우  8자 이상이어야 합니다.")
    }
  })
})