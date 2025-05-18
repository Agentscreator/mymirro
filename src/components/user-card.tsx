"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User } from "lucide-react"

// Tag colors
const TAG_COLORS = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
]

interface UserCardProps {
  user: {
    id: number
    username: string
    image: string
    reason: string
    tags?: string[]
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

  const getTagColor = (tag: string) => {
    // Generate a consistent color based on the tag string
    const index = tag.length % TAG_COLORS.length
    return TAG_COLORS[index]
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

            {/* User tags */}
            {user.tags && user.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {user.tags.map((tag) => (
                  <Badge key={tag} className={getTagColor(tag)}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

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
