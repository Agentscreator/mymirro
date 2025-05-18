import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
      {children}
    </ThemeProvider>
  )
}

