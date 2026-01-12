"use server"
import { auth, signIn, signOut, update } from "@/lib/auth"
import ServiceError from "@/services/@common/ServiceError"
import { SignUpSchema } from "@/services/auth/schema"
import AuthService from "@/services/auth/AuthService"
import { redirect } from "next/navigation"
import { ROUTE } from "@/const/route"
import { isRedirectError, RedirectType } from "next/dist/client/components/redirect-error"

export const signUp = async (state: unknown, form: FormData) => {
  const data = {
    email: form.get("email") || "",
    name: form.get("name") || "",
    password: form.get("password") || "",
    passwordConfirm: form.get("password-confirm") || "",
  }

  try {
    const result = SignUpSchema.safeParse(data)

    if (!result.success) {
      return {
        ok: false,
        field: result.error.issues[0].path[0] as string,
        message: result.error.issues[0].message,
      }
    }
    await new AuthService().signUp(result.data)
    redirect(ROUTE.AUTH.SIGN_IN, RedirectType.replace)
  } catch (e) {
    if (isRedirectError(e)) {
      throw e
    }
    if (ServiceError.isError(e)) {
      return { ok: false, field: null, message: e.message }
    }
    return { ok: false, field: null, message: "회원가입에 실패하였습니다. 다시 시도해주세요." }
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
