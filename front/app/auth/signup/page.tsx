"use client"

import { ROUTE } from "@/const/route";
import { signUp } from "@/server-actions/auth";
import { SignUpSchema } from "@/services/user/schema";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email") || "",
      name: form.get("name") || "",
      password: form.get("password") || "",
      passwordConfirm: form.get("password-confirm") || "",
    }
    const parsed = SignUpSchema.safeParse(data)

    if (!parsed.success) {
      setError(parsed.error.issues[0].message)
      return
    }
    const { ok, message } = await signUp(form)

    if (!ok) {
      setError(message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.")
    } else {
      router.push(ROUTE.AUTH.SIGN_IN)
    }
  }

  return (
    <div className="">
      SignUp
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일(ID)</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="email">이름</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="password">비밀번호 확인</label>
          <input type="password" name="password-confirm" id="password-confirm" />
        </div>
        {!!error && <p>{error}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}