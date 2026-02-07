import { useFileShareForm } from "@/app/_home/hooks/useFileShareForm"
import DropZone from "@/components/DropZone"
import { Form } from "@/components/Form"
import { Button, Spinner } from "@radix-ui/themes"
import { useActionState } from "react"

const FileShareForm = () => {
  const [actionState, action, isPending] = useActionState(() => {}, INITIAL_ACTION_STATE)
  const { register, form } = useFileShareForm()

  return (
    <form className="flex flex-col gap-4">
      <Form.Text
        title="제목(선택)"
        type="text"
        name="title"
        placeholder="제목을 입력하세요."
        {...register.title}
      />
      <DropZone {...register.file} />
      <Button
        size="3"
        type="submit"
        disabled={!form.file || isPending}
        className="w-full"
      >
        <Spinner loading={isPending} />
        파일 공유하기
      </Button>
    </form>
  )
}

const INITIAL_ACTION_STATE = { ok: false, message: "" }

export default FileShareForm