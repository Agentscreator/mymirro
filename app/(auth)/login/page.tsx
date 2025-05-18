"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // For demo purposes, accept "1234" as username and "12345678" as password
    if (formData.username === "1234" && formData.password === "12345678") {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/discover")
    } else {
      alert("Invalid credentials. For demo, use username: 1234, password: 12345678")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 silver-pattern">
      <Link href="/" className="absolute left-4 top-4 flex items-center gap-2">
        <Logo size="sm" />
        <span className="text-lg font-bold blue-text">Mirro</span>
      </Link>

      <Card className="w-full max-w-md premium-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center blue-text">Welcome back</CardTitle>
          <CardDescription className="text-center premium-subheading">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="premium-input"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="premium-input"
              />
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-xs premium-text-muted hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full premium-button" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
            <p className="text-xs premium-text-muted text-center">For demo: username: 1234, password: 12345678</p>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="premium-link">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

