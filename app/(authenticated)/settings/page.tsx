"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Bell, LogOut, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const router = useRouter()
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [currentTier, setCurrentTier] = useState("free")

  // Only show the correct theme after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    // Simulate logout
    router.push("/login")
  }

  // Avoid hydration mismatch
  if (!mounted) return null

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="mb-6 text-3xl font-bold blue-text">Settings</h1>

      <div className="space-y-6">
        {/* Subscription Tiers */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="premium-heading">Subscription</CardTitle>
            <CardDescription className="premium-subheading">Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Free Tier */}
              <Card
                className={`border ${currentTier === "free" ? "border-blue-500 dark:border-blue-400" : "border-gray-200 dark:border-gray-800"} rounded-xl`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Free</CardTitle>
                  <Badge className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Current Plan
                  </Badge>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold">
                    $0<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>25k public characters</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>64k private characters</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Basic connection features</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full" disabled>
                    Current Plan
                  </Button>
                </CardFooter>
              </Card>

              {/* Plus Tier */}
              <Card className="border border-gray-200 dark:border-gray-800 rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Plus</CardTitle>
                  <Badge className="w-fit bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    Coming Soon
                  </Badge>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold">
                    $5<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>120k public characters</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>240k private characters</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Advanced connection features</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Locked
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Tier */}
              <Card className="border border-gray-200 dark:border-gray-800 rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Premium</CardTitle>
                  <Badge className="w-fit bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    Coming Soon
                  </Badge>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold">
                    $15<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>468k public characters</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>1M private characters</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Premium connection features</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Locked
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="premium-heading">Appearance</CardTitle>
            <CardDescription className="premium-subheading">Choose how Mirro looks to you</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={resolvedTheme} onValueChange={(value) => setTheme(value)} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" className="premium-radio" />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-blue-500/5"
                >
                  <div className="space-y-1">
                    <p className="font-medium premium-text">Dark</p>
                    <p className="text-sm premium-text-muted">Dark blue theme</p>
                  </div>
                  <div className="ml-4 h-12 w-12 rounded-full bg-[#111827] border border-blue-500/20"></div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" className="premium-radio" />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-blue-500/5"
                >
                  <div className="space-y-1">
                    <p className="font-medium premium-text">Light</p>
                    <p className="text-sm premium-text-muted">Light silver theme</p>
                  </div>
                  <div className="ml-4 h-12 w-12 rounded-full bg-[#f9fafb] border border-blue-500/20"></div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="premium-heading">Notifications</CardTitle>
            <CardDescription className="premium-subheading">Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="notifications" className="premium-text">
                    Enable notifications
                  </Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="premium-switch"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="premium-heading">Account</CardTitle>
            <CardDescription className="premium-subheading">Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full rounded-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
