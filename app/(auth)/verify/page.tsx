"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export default function VerifyPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // For demo purposes, accept "1234" as the verification code
    if (code === "1234") {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/discover")
    } else {
      alert("Invalid code. For demo, use 1234.")
      setLoading(false)
    }
  }

  const resendCode = () => {
    setTimeLeft(60)
    // Simulate resending code
    alert("New code sent! (For demo, use 1234)")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 silver-pattern">
      <Link href="/" className="absolute left-4 top-4 flex items-center gap-2">
        <Logo size="sm" />
        <span className="text-lg font-bold blue-text">Mirro</span>
      </Link>

      <Card className="w-full max-w-md premium-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center blue-text">Verify your phone</CardTitle>
          <CardDescription className="text-center">We sent a verification code to your phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="text-center text-lg tracking-widest premium-input"
                maxLength={4}
                required
              />
              <p className="text-xs text-muted-foreground text-center">For demo purposes, enter "1234"</p>
            </div>
            <Button type="submit" className="w-full premium-button" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            {timeLeft > 0 ? (
              <p className="text-muted-foreground">Resend code in {timeLeft} seconds</p>
            ) : (
              <Button variant="link" onClick={resendCode} className="text-primary">
                Resend code
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

