"use client"

import { useSignUpForm } from "@/app/auth/signup/useSignUpForm"
import { Form } from "@/components/Form"
import FormError from "@/components/Form/FormError"
import { signUp } from "@/server-actions/auth"
import { Button, Spinner } from "@radix-ui/themes"
import { useActionState } from "react"

const SignUpActionForm = () => {
  const [actionState, action, isPending] = useActionState(signUp, INITIAL_ACTION_STATE)
  const { register, error } = useSignUpForm(actionState)

  const { field, message } = error

  return (
    <form action={action} className="flex flex-col gap-4">
      <Form.Text
        title="이메일(ID)"
        type="email"
        id="email"
        name="email"
        placeholder="이메일(ID)를 입력해주세요."
        {...register.email}
        error={field === "email" && message}
      />
      <Form.Text
        title="이름"
        type="text"
        name="name"
        id="name"
        placeholder="이름을 입력해주세요."
        {...register.name}
        error={field === "name" && message}
      />
      <Form.Text
        title="비밀번호"
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        autoComplete="new-password"
        {...register.password}
        error={field === "password" && message}
      />
      <Form.Text
        title="비밀번호 확인"
        type="password"
        name="password-confirm"
        id="password-confirm"
        placeholder="비밀번호 확인을 입력해주세요."
        autoComplete="new-password"
        {...register.passwordConfirm}
        error={field === "passwordConfirm" && message}
      />
      {!field && <FormError error={message} />}
      <Button
        size="3"
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        <Spinner loading={isPending} />
        회원가입
      </Button>
    </form>
  )
}

const INITIAL_ACTION_STATE = { ok: false, message: "" }

export default SignUpActionForm