"use client"
import { useFileShareForm } from "@/app/_home/hooks/useFileShareForm"
import DropZone from "@/components/DropZone"
import { Form } from "@/components/Form"
import { useActionOnClient } from "@/hooks/useActionOnClient"
import { clearDeviceId, getDeviceId } from "@/lib/device"
import { signOutWithForm } from "@/server-actions/auth"
import { uploadFile } from "@/server-actions/share"
import { DEVICE_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { Button, Spinner } from "@radix-ui/themes"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

const FileShareForm = () => {
  const { data: session } = useSession()
  const { action, getActionState, isPending } = useActionOnClient({
    action: uploadFile,
    onSuccess: () => {
      toast.success("파일 공유에 성공하였습니다.")
      reset()
    },
    onError: async (e) => {
      toast.error(e.message)
      if (ServiceError.codeOf(DEVICE_ERROR.DEVICE_BLOCKED, e.code)) {
        clearDeviceId()
        await signOutWithForm(session?.user?.refreshToken)
      }
    }
  })
  const { register, reset, form } = useFileShareForm(getActionState())

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

export default FileShareForm