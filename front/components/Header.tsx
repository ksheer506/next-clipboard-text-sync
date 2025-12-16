import { ROUTE } from "@/const/route";
import { getSession, signOutWithForm } from "@/server-actions/auth";
import Link from "next/link";

export default async function Header() {
  const session = await getSession();

  return (
    <header>
      {session?.user ? (
        <>
          <p>{session.user.name}</p>
          <form action={signOutWithForm}>
            <button type="submit">로그아웃</button>
          </form>
        </>

      ) : (
        <>
          <Link href={ROUTE.AUTH.SIGN_IN}>로그인</Link>
          <Link href={ROUTE.AUTH.SIGN_UP}>회원가입</Link>
        </>
      )}
    </header>
  )
}