import { getSession } from "@/server-actions/auth";
import Link from "next/link";

export default async function Header() {
  const session = await getSession();

  return (
    <header>
      {session?.user ? (
        <p>
          {`${session.user.firstName} ${session.user.lastName}`}
        </p>
      ) : (
        <>
          <Link href="/auth/signin">로그인</Link>
          <Link href="/auth/signup">회원가입</Link>
        </>
      )}
    </header>
  )
}