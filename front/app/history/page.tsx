import ShareItem from "@/components/ShareItem/ShareItem"
import { ROUTE } from "@/const/route";
import { ShareItemType } from "@/generated/prisma/enums"
import { getSession } from "@/server-actions/auth";
import ShareService from "@/services/share/ShareService";
import { redirect, RedirectType } from "next/navigation";

const History = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!session || !userId) {
    redirect(ROUTE.AUTH.SIGN_IN, RedirectType.replace);
  }
  const history = await new ShareService().getHistory(Number(userId));

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="w-full flex flex-col">
        <header className="w-full flex flex-col items-start gap-2">
          <h1 className="text-4xl font-bold">공유 기록</h1>
          <p className="text-lg">내가 공유한 텍스트와 파일을 확인하세요.</p>
        </header>
        <div>
          {history.map((item) => (
            <ShareItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

const DUMMY_SHARE_ITEM = {
  type: ShareItemType.TEXT,
  title: "test title",
  content: "test estestestestestestestestestestestestestestestestestestestestestestestestest",
  createdAt: new Date(),
  expiresAt: new Date(),
}

export default History