import { ErrorState } from "@/hooks/useActionOnClient"
import { ChangeEvent, useEffect, useState } from "react"

export const useSignUpForm = (actionError: ErrorState | null = null) => {
  const [error, setError] = useState<ErrorState>(actionError ?? INITIAL_ERROR)
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  })

  const handleChangeValue = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    setError(INITIAL_ERROR)
    setForm({ ...form, [field]: e.target.value })
  }

  useEffect(() => {
    setError(actionError ?? INITIAL_ERROR)
  }, [actionError])

  const register = {
    email: {
      value: form.email,
      onChange: handleChangeValue("email"),
    },
    name: {
      value: form.name,
      onChange: handleChangeValue("name"),
    },
    password: {
      value: form.password,
      onChange: handleChangeValue("password"),
    },
    passwordConfirm: {
      value: form.passwordConfirm,
      onChange: handleChangeValue("passwordConfirm"),
    },
  }

  return { register, error }
}

const INITIAL_ERROR = { message: "" }
