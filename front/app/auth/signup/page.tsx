import { signUp } from "@/server-actions/auth";

export default function SignUp() {
  return (
    <div className="">
      SignUp
      <form action={signUp}>
        <div>
          <label htmlFor="email">이메일(ID)</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="password">비밀번호 확인</label>
          <input type="password" name="password-confirm" id="password" />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}