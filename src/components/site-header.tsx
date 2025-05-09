"use client"

import { SidebarIcon } from "lucide-react"

import { SearchForm } from "~/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { useSidebar } from "~/components/ui/sidebar"
import { ModeToggle } from "./toggle-theme"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="default"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        
      
        <ModeToggle/>
      </div>
    </header>
  )
}
