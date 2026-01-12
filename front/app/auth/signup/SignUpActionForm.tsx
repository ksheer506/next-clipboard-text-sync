"use client"

import FormError from "@/components/Form/FormError"
import TextField from "@/components/Form/TextField"
import { signUp } from "@/server-actions/auth"
import { Button } from "@radix-ui/themes"
import { useActionState } from "react"

interface FormError {
  field: string | null
  message: string
}

const SignUpActionForm = () => {
  const [state, action, isPending] = useActionState(signUp, INITIAL_ACTION_STATE)

  const { field, message } = state

  return (
    <form action={action} className="flex flex-col gap-4">
      <TextField
        title="이메일(ID)"
        type="email"
        id="email"
        name="email"
        placeholder="이메일(ID)를 입력해주세요."
        error={field === "email" && message}
      />
      <TextField
        title="이름"
        type="text"
        name="name"
        id="name"
        placeholder="이름을 입력해주세요."
        error={field === "name" && message}
      />
      <TextField
        title="비밀번호"
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        autoComplete="new-password"
        error={field === "password" && message}
      />
      <TextField
        title="비밀번호 확인"
        type="password"
        name="password-confirm"
        id="password-confirm"
        placeholder="비밀번호 확인을 입력해주세요."
        autoComplete="new-password"
        error={field === "passwordConfirm" && message}
      />
      {field === "UNKNOWN" && <FormError error={message} />}
      <Button
        size="3"
        type="submit"
        loading={isPending}
        disabled={isPending}
        className="w-full"
      >
        회원가입
      </Button>
    </form>
  )
}

const INITIAL_ACTION_STATE = { ok: false, field: null, message: "" }

export default SignUpActionForm