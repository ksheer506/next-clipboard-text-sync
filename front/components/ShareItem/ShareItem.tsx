"use client"
import Card from "@/components/Card"
import { ShareItemType } from "@/generated/prisma/enums"
import { formatDate } from "@/lib/format"
import { Button } from "@radix-ui/themes"
import { Check, Copy, Paperclip, Type } from "lucide-react"
import { useRef, useState } from "react"

interface TextItemProps {
  content: string
}

interface ShareItemProps {
  type: ShareItemType
  title?: string
  content?: string
  fileUrl?: string
  createdAt: Date
  expiresAt: Date
}

const ShareItem = ({ type, title, content, fileUrl, createdAt }: ShareItemProps) => {

  return (
    <Card>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
          {type === ShareItemType.TEXT ? <Type className="w-5 h-5" /> : <Paperclip className="w-5 h-5" />}
        </div>
        {!!title && <h3 className="text-lg font-bold">{title}</h3>}
        <p className="text-xs text-muted-foreground ml-auto">{formatDate(createdAt)}</p>
      </div>
      {type === ShareItemType.TEXT ? <TextItemBody content={content} /> : <></>}
    </Card>
  )
}

const TextItemBody = ({ content }: TextItemProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const timerId = useRef<NodeJS.Timeout>(null)

  const handleCopy = () => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
    setIsCopied(true)
    navigator.clipboard.writeText(content)
    timerId.current = setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <div className="flex gap-2 bg-muted/50 rounded-lg p-4">
      <p className="mr-auto break-all whitespace-pre-wrap">{content}</p>
      <Button size="1" color="gray" variant="soft" radius="large" className="cursor-pointer!" onClick={handleCopy}>
        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </Button>
    </div>
  ) }

export default ShareItem