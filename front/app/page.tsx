import ShareItemForm from "@/app/_home/ShareItemForm";
import Card from "@/components/Card";
import Landing from "@/components/Landing";
import { getSession } from "@/server-actions/auth";

export default async function App() {
  const session = await getSession();

  if (!session) {
    return <Landing />;
  }
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <header className="w-full flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">공유하기</h1>
          <p className="text-lg">텍스트나 파일을 안전하게 저장하고 공유하세요.</p>
        </header>
        <Card>
          <ShareItemForm />
        </Card>
      </div>
    </div>
  );
}
