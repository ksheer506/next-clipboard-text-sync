"use client"
import { useTextShareForm } from "@/app/_home/hooks/useTextShareForm"
import { Form } from "@/components/Form"
import { useActionOnClient } from "@/hooks/useActionOnClient"
import { clearDeviceId, getDeviceId } from "@/lib/device"
import { signOutWithForm } from "@/server-actions/auth"
import { uploadText } from "@/server-actions/share"
import { DEVICE_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { Button, Spinner } from "@radix-ui/themes"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

const TextShareForm = () => {
  const { data: session } = useSession()
  const { action, getActionState, isPending } = useActionOnClient({
    action: uploadText,
    onSuccess: () => {
      toast.success("텍스트 공유에 성공하였습니다.")
      reset()
    },
    onError: async (e) => {
      toast.error(e.message)
      if (ServiceError.codeOf(DEVICE_ERROR.DEVICE_BLOCKED, e.code)) {
        clearDeviceId()
        await signOutWithForm(session?.user?.refreshToken)
      }
    },
  })
  const { register, reset, form } = useTextShareForm(getActionState())

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

export default TextShareForm