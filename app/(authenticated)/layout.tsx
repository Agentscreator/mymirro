import type React from "react"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Navigation />
        <main className="flex-1 pb-16 md:ml-16 md:pb-0">{children}</main>
      </div>
    </ThemeProvider>
  )
}

