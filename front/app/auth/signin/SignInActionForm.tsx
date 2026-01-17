"use client"

import { useSignInForm } from "@/app/auth/signin/useSignInForm"
import { Form } from "@/components/Form"
import FormError from "@/components/Form/FormError"
import { signInWithCredentials } from "@/server-actions/auth"
import { Button, Spinner } from "@radix-ui/themes"
import { useActionState } from "react"

const SignInActionForm = () => {
  const [actionState, action, isPending] = useActionState(signInWithCredentials, INITIAL_ACTION_STATE)
  const { register, error } = useSignInForm(actionState ?? null)

  return (
    <form action={action} className="flex flex-col gap-4">
      <Form.Text
        title="이메일(ID)"
        type="email"
        id="email"
        name="email"
        placeholder="이메일(ID)를 입력해주세요."
        {...register.email}
      />
      <Form.Text
        title="비밀번호"
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        {...register.password}
      />
      {error.message && <FormError error={error.message} />}
      <Button
        size="3"
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        <Spinner loading={isPending} />
        로그인
      </Button>
    </form>
  )
}

const INITIAL_ACTION_STATE = { ok: false, message: "" }

export default SignInActionForm