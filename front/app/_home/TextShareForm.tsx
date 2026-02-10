"use client"
import { useTextShareForm } from "@/app/_home/hooks/useTextShareForm"
import { Form } from "@/components/Form"
import { getDeviceId } from "@/lib/device"
import { uploadText } from "@/server-actions/share"
import { Button, Spinner } from "@radix-ui/themes"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const TextShareForm = () => {
  const [actionState, action, isPending] = useActionState(uploadText, INITIAL_ACTION_STATE)
  const { register, reset, form } = useTextShareForm(actionState)

  useEffect(() => {
    if (!actionState) return
    const { ok, message } = actionState

    if (ok) {
      toast.success("텍스트 공유에 성공하였습니다.")
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
      <Form.TextArea
        title="내용"
        name="content"
        placeholder="공유할 텍스트를 입력하세요."
        {...register.content}
      />
      <Button
        size="3"
        type="submit"
        disabled={!form.content.trim() || isPending}
        className="w-full"
      >
        <Spinner loading={isPending} />
        텍스트 공유하기
      </Button>
    </form>
  )
}

const INITIAL_ACTION_STATE = { ok: false, message: "" }

export default TextShareForm