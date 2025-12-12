"use server"
import { auth, signIn, signOut, update } from "@/lib/auth"
import ServiceError from "@/services/@common/ServiceError"
import UserService from "@/services/user/UserService"

export const signUp = async (form: FormData) => {
  const email = (form.get("email") || "") as string
  const password = (form.get("password") || "") as string
  const name = (form.get("name") || "") as string

  try {
    await new UserService().signUp({ email, password, name })
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
