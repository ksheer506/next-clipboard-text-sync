import { ErrorState } from "@/hooks/useActionOnClient";
import { ChangeEvent, useEffect, useState } from "react";

export const useTextShareForm = (actionError: ErrorState | null = null) => {
  const [error, setError] = useState<ErrorState>(actionError ?? INITIAL_ERROR)
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChangeValue = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(INITIAL_ERROR)
    setForm({ ...form, [field]: e.target.value })
  }

  const handleReset = () => {
    setError(INITIAL_ERROR)
    setForm({ title: "", content: "" })
  }

  useEffect(() => {
    setError(actionError ?? INITIAL_ERROR)
  }, [actionError])

  const register = {
    title: {
      value: form.title,
      onChange: handleChangeValue("title"),
    },
    content: {
      value: form.content,
      onChange: handleChangeValue("content"),
    },
  }

  return { register, reset: handleReset, form, error }
};

const INITIAL_ERROR = { message: "" }