"use server"
import { auth, signIn, signOut, update } from "@/lib/auth"
import ServiceError from "@/services/@common/ServiceError"
import { SignUpSchema } from "@/services/user/schema"
import UserService from "@/services/user/UserService"

export const signUp = async (form: FormData) => {
  const email = (form.get("email") || "") as string
  const name = (form.get("name") || "") as string
  const password = (form.get("password") || "") as string
  const passwordConfirm = (form.get("password-confirm") || "") as string

  try {
    const result = SignUpSchema.safeParse({ email, password, passwordConfirm, name })

    if (!result.success) {
      return { ok: false, message: result.error.issues[0].message }
    }
    await new UserService().signUp(result.data)
    return { ok: true }
  } catch (e) {
    if (ServiceError.isError(e)) {
      return { ok: false, message: e.message }
    }
    return { ok: false, message: "회원가입에 실패하였습니다. 다시 시도해주세요." }
  }
}

export const signInWithCredentials = async (form: FormData) => signIn("credentials", {
  email: form.get("email") || "",
  password: form.get("password") || "",
  redirectTo: "/",
})

export const signOutWithForm = async () => {
  await signOut({ redirectTo: "/" })
}

export const getSession = auth

export const updateSession = update
