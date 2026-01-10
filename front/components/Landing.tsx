import Card from "@/components/Card";
import { ROUTE } from "@/const/route";
import { Button } from "@radix-ui/themes"
import { FileText, Upload } from "lucide-react"
import Link from "next/link";

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <div className="flex flex-col items-center gap-2">
          <div className="w-18 h-18 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold my-4">ShareHub</h1>
          <p className="text-muted-foreground">텍스트와 파일을 편리하게 공유하세요.</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-sm">
            <FileText className="w-5 h-5 text-primary" />
            <span>텍스트 공유 및 저장</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Upload className="w-5 h-5 text-secondary" />
            <span>파일 업로드 및 관리</span>
          </div>
        </div>
        <Link href={ROUTE.AUTH.SIGN_IN} className="rt-reset rt-BaseButton rt-r-size-3 rt-variant-solid rt-Button">로그인하기</Link>
      </Card>
    </div>
  )
}

export default Landing