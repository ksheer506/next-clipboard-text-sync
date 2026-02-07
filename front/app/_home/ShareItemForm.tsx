"use client"

import TextShareForm from "@/app/_home/TextShareForm"
import * as Tabs from "@radix-ui/react-tabs"
import { FileText, Upload } from "lucide-react"

const SHARE_ITEM_TABS = {
  text: "text",
  file: "file",
}

const ShareItemForm = () => {
  return (
    <Tabs.Root defaultValue={SHARE_ITEM_TABS.text} className="w-full flex flex-col gap-2">
      <Tabs.List className="grid w-full grid-cols-2 bg-muted text-muted-foreground h-9 items-center justify-center rounded-lg p-[3px]">
        <Tabs.Trigger value={SHARE_ITEM_TABS.text} className={TABS_TRIGGER_CLASSNAME}>
          <FileText className="w-4 h-4" />
          텍스트
        </Tabs.Trigger>
        <Tabs.Trigger value={SHARE_ITEM_TABS.file} className={TABS_TRIGGER_CLASSNAME}>
          <Upload className="w-4 h-4" />
          파일
        </Tabs.Trigger>
      </Tabs.List>

      <div className="mt-5">
        <Tabs.Content value={SHARE_ITEM_TABS.text}>
          <TextShareForm />
        </Tabs.Content>
        <Tabs.Content value={SHARE_ITEM_TABS.file}>
          <p>Access and update your documents.</p>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}

const TABS_TRIGGER_CLASSNAME = "flex items-center gap-2 data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

export default ShareItemForm