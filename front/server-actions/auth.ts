"use server"
import { auth, signIn, signOut, update } from "@/lib/auth"

export const signInWithCredentials = async (form: FormData) => signIn("credentials", {
  email: form.get("email") || "",
  password: form.get("password") || "",
  redirectTo: "/",
})

export const signOutWithForm = signOut

export const getSession = auth

export const updateSession = update
