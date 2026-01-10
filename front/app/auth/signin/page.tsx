import Card from "@/components/Card";
import TextField from "@/components/Form/TextField";
import { ROUTE } from "@/const/route";
import { signInWithCredentials } from "@/server-actions/auth";
import { Button } from "@radix-ui/themes";
import { CircleX } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  /* TODO:ksh: SignInActionForm으로 분리하기 */
  /* TODO:ksh: 에러 상태 처리 */
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <form action={signInWithCredentials} className="flex flex-col gap-4">
          <TextField
            title="이메일(ID)"
            type="email"
            id="email"
            name="email"
            defaultValue="ksheer506@naver.com"
            placeholder="이메일(ID)를 입력해주세요."
          />
          <TextField
            title="비밀번호"
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <Button size="3" type="submit" className="w-full">로그인</Button>
        </form>
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
