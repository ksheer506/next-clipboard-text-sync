"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FunctionComponent } from "react"

interface MenuLinkProps {
  to: string
  Icon: FunctionComponent<{ className?: string }>
  title: string
}

const MenuLink = ({ to, Icon, title }: MenuLinkProps) => {
  const path = usePathname();

  const isActive = path === to

  return (
    <Link
      href={to}
      className={clsx(
        "flex items-center justify-start gap-3 p-2 w-full h-10 rounded-md hover:bg-sidebar-accent-muted transition-colors",
        { "bg-sidebar-accent": isActive }
      )}
    >
      <Icon className={`shrink-0 grow-0 w-[19px] h-[19px] ${isActive ? "text-primary" : "text-muted-foreground"}`} />
      <span className="text-sm flex basis-0 flex-1 items-start transition-all duration-500 overflow-hidden whitespace-nowrap pt-0.5">
        {title}
      </span>
    </Link>
  )
}

export default MenuLink