import SignOutButton from "@/app/SignOutButton";
import Landing from "@/components/Landing";
import { ROUTE } from "@/const/route";
import { getSession } from "@/server-actions/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return <Landing />;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link href={ROUTE.AUTH.SIGN_IN}>Login</Link>
      </main>
      <SignOutButton />
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
