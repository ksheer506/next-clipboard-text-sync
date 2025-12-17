import { getSession } from "@/server-actions/auth";
import { redirect, RedirectType } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function SignInLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (session) {
    redirect("/", RedirectType.replace);
  }
  return children
}