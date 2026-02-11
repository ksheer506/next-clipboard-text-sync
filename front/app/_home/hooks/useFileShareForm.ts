import { ErrorState } from "@/hooks/useActionOnClient";
import { ChangeEvent, useEffect, useState } from "react";

export const useFileShareForm = (actionError: ErrorState | null = null) => {
  const [error, setError] = useState<ErrorState>(actionError ?? INITIAL_ERROR)
  const [form, setForm] = useState({ title: "", file: null as File | null });

  const handleChangeValue = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(INITIAL_ERROR)
    setForm({ ...form, [field]: e.target.value })
  }

  const handleChangeFile = (files: File[]) => {
    setError(INITIAL_ERROR)
    setForm({ ...form, file: files[0] })
  }

  const handleReset = () => {
    setError(INITIAL_ERROR)
    setForm({ title: "", file: null })
  }

  useEffect(() => {
    setError(actionError ?? INITIAL_ERROR)
  }, [actionError])

  const register = {
    title: {
      value: form.title,
      onChange: handleChangeValue("title"),
    },
    file: {
      value: form.file,
      onChange: handleChangeFile,
    },
  }

  return { register, reset: handleReset, form, error }
};

const INITIAL_ERROR = { message: "" }