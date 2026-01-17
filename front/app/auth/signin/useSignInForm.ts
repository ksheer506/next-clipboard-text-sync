import { FormActionError } from "@/@types/common"
import { ChangeEvent, useEffect, useState } from "react"

export const useSignInForm = (actionError: FormActionError | null) => {
  const [error, setError] = useState<FormActionError>(actionError ?? INITIAL_ERROR)
  const [form, setForm] = useState({
    email: "",
    password: "",
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
    password: {
      value: form.password,
      onChange: handleChangeValue("password"),
    },
  }

  return { register, error }
}

const INITIAL_ERROR = { message: "" }