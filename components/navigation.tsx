"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Lock, User, MessageSquare, Settings } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/discover",
      icon: Search,
      label: "Discover",
      active: pathname === "/discover",
    },
    {
      href: "/inner-world",
      icon: Lock,
      label: "The Mirror",
      active: pathname === "/inner-world",
    },
    {
      href: "/profile",
      icon: User,
      label: "You",
      active: pathname === "/profile",
    },
    {
      href: "/messages",
      icon: MessageSquare,
      label: "Messages",
      active: pathname === "/messages",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t glass-effect p-2 md:top-0 md:h-screen md:w-16 md:border-r md:border-t-0 md:p-4">
      <div className="flex h-full items-center justify-between md:flex-col md:justify-start md:space-y-6">
        <Link href="/discover" className="hidden md:block">
          <Logo size="md" />
        </Link>
        <div className="flex w-full items-center justify-between md:flex-col md:items-center md:justify-start md:space-y-6">
          {routes.map((route) => (
            <Link
              key={route.href + route.label}
              href={route.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-blue-500/10",
                route.active && "bg-blue-500/20 blue-glow",
              )}
            >
              <route.icon
                className={cn("h-5 w-5", route.active ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground")}
              />
              <span className="sr-only">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
