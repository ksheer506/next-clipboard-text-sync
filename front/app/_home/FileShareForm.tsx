"use client"
import { useFileShareForm } from "@/app/_home/hooks/useFileShareForm"
import DropZone from "@/components/DropZone"
import { Form } from "@/components/Form"
import { getDeviceId } from "@/lib/device"
import { uploadFile } from "@/server-actions/share"
import { Button, Spinner } from "@radix-ui/themes"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const FileShareForm = () => {
  const [actionState, action, isPending] = useActionState(uploadFile, INITIAL_ACTION_STATE)
  const { register, reset, form } = useFileShareForm(actionState)

  useEffect(() => {
    if (!actionState) return
    const { ok, message } = actionState

    if (ok) {
      toast.success("파일 공유에 성공하였습니다.")
      reset()
    } else if (!ok && message) {
      toast.error(message)
    }
  }, [actionState])

  return (
    <form action={(form) => action({ form, deviceId: getDeviceId() })} className="flex flex-col gap-4">
      <Form.Text
        title="제목(선택)"
        type="text"
        name="title"
        placeholder="제목을 입력하세요."
        {...register.title}
      />
      <DropZone name="file" {...register.file} />
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