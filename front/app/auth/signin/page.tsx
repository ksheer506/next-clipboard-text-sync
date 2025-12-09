import { signInWithCredentials } from "@/server-actions/auth";

export default function SignIn() {
  return (
    <div className="">
      SignIn
      <form action={signInWithCredentials}>
        <div>
          <label htmlFor="email">이메일(ID)</label>
          <input type="email" name="email" id="email" defaultValue="a@a.a" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" defaultValue="11" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
