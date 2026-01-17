import SignInActionForm from "@/app/auth/signin/SignInActionForm";
import Card from "@/components/Card";
import { ROUTE } from "@/const/route";
import { CircleX } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <SignInActionForm />
        <div className="relative flex justify-center h-px bg-border my-2">
          {/* <span className="bg-card px-2 text-muted-foreground">또는</span> */}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <span>계정이 없으신가요? </span>
          <Link href={ROUTE.AUTH.SIGN_UP} className="text-primary hover:underline font-medium">회원가입</Link>
        </div>
      </Card>
    </div>
  );
}
