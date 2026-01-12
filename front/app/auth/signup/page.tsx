"use client"

import Card from "@/components/Card";
import FormError from "@/components/Form/FormError";
import TextField from "@/components/Form/TextField";
import { ROUTE } from "@/const/route";
import { signUp } from "@/server-actions/auth";
import { SignUpSchema } from "@/services/auth/schema";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface FormError {
  field: string
  message: string
}

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState<FormError>({ field: "", message: "" })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({ field: "", message: "" })

    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email") || "",
      name: form.get("name") || "",
      password: form.get("password") || "",
      passwordConfirm: form.get("password-confirm") || "",
    }
    const { success, error } = SignUpSchema.safeParse(data)

    if (!success) {
      setError({
        field: error.issues[0].path[0] as string,
        message: error.issues[0].message
      }
      )
      return
    }
    const { ok, message } = await signUp(form)

    if (!ok) {
      setError({
        field: "UNKNOWN",
        message: message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
      })
    } else {
      router.replace(ROUTE.AUTH.SIGN_IN)
    }
  }

  /* TODO:ksh: SignUpActionForm으로 분리하기 */
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            title="이메일(ID)"
            type="email"
            id="email"
            name="email"
            placeholder="이메일(ID)를 입력해주세요."
            error={error.field === "email" && error.message}
          />
          <TextField
            title="이름"
            type="text"
            name="name"
            id="name"
            placeholder="이름을 입력해주세요."
            error={error.field === "name" && error.message}
          />
          <TextField
            title="비밀번호"
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="new-password"
            error={error.field === "password" && error.message}
          />
          <TextField
            title="비밀번호 확인"
            type="password"
            name="password-confirm"
            id="password-confirm"
            placeholder="비밀번호 확인을 입력해주세요."
            autoComplete="new-password"
            error={error.field === "passwordConfirm" && error.message}
          />
          {error.field === "UNKNOWN" && <FormError error={error.message} />}
          <Button size="3" type="submit" className="w-full">회원가입</Button>
        </form>
      </Card>
    </div>
  )
}