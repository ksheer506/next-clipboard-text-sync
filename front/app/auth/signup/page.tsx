import SignUpActionForm from "@/app/auth/signup/SignUpActionForm";
import Card from "@/components/Card";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <SignUpActionForm />
      </Card>
    </div>
  )
}