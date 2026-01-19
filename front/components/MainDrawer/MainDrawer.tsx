"use client"

import { useRef, useState } from "react";
import { PanelLeftIcon, UploadIcon, HistoryIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "@radix-ui/themes";
import MenuLink from "@/components/MainDrawer/MenuLink";
import { ROUTE } from "@/const/route";

const MIN_WIDTH = "55px"
const MAX_WIDTH = "250px"

const MainDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{ width: isExpanded ? MAX_WIDTH : MIN_WIDTH }}
      className="relative flex-none border-r border-r-sidebar-border transition-all duration-500"
      ref={container}
    >
      <div className="bg-gray-100 h-full w-full bottom-0 left-0 right-0 outline-none transition-all">
        <div className="px-2 py-7 bg-white w-full h-full">
          <div className="flex items-center gap-3 h-8 mb-5 overflow-hidden">
            <Button
              size="2"
              variant="ghost"
              style={{ margin: 0, padding: "0.4rem", borderRadius: "0.5rem" }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <PanelLeftIcon />
            </Button>
            <span className="text-lg font-bold">ShareHub</span>
          </div>
          <div className="flex flex-col gap-2">
            <MenuLink
              to={ROUTE.ITEMS.SHARE}
              Icon={UploadIcon}
              title="공유하기"
            />
            <MenuLink
              to={ROUTE.ITEMS.HISTORY}
              Icon={HistoryIcon}
              title="공유 기록"
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default MainDrawer