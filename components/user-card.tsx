"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, User } from "lucide-react"

interface UserCardProps {
  user: {
    id: number
    username: string
    image: string
    reason: string
  }
}

export function UserCard({ user }: UserCardProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const charIndexRef = useRef(0)

  // Start typing animation when component mounts
  useEffect(() => {
    startTyping()

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Reset and restart animation when user changes
  useEffect(() => {
    resetTyping()
    startTyping()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [user.id, user.reason])

  const startTyping = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsTyping(true)
    charIndexRef.current = 0
    setDisplayedText("")

    // Use setInterval instead of recursive setTimeout
    intervalRef.current = setInterval(() => {
      if (charIndexRef.current < user.reason.length) {
        setDisplayedText(user.reason.substring(0, charIndexRef.current + 1))
        charIndexRef.current++
      } else {
        // Animation complete
        setIsTyping(false)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, 30)
  }

  const resetTyping = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setDisplayedText("")
    charIndexRef.current = 0
    setIsTyping(false)
  }

  return (
    <Card className="border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full shadow-md border-2 border-blue-200 dark:border-blue-800">
            <Image
              src={user.image || "/placeholder.svg"}
              alt={user.username}
              width={60}
              height={60}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{user.username}</h3>
            <div className="mt-2 min-h-[150px]">
              <h4 className="font-medium text-blue-600 dark:text-blue-400">The Thread Between You:</h4>
              <p className={`mt-1 text-sm text-gray-700 dark:text-gray-300 ${isTyping ? "typing-animation" : ""}`}>
                {displayedText}
              </p>
            </div>
            <div className="mt-4 flex justify-end items-center gap-2">
              <Link href={`/messages/${user.id}`}>
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Message</span>
                </Button>
              </Link>
              <Link href={`/profile/${user.id}`}>
                <Button
                  variant="outline"
                  className="rounded-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30 flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
