"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ArrowLeft } from "lucide-react"

// Mock user data
const USERS = {
  "1": {
    id: 1,
    username: "belle_explorer",
    image: "/placeholder.svg?height=50&width=50",
  },
  "2": {
    id: 2,
    username: "mindful_creator",
    image: "/placeholder.svg?height=50&width=50",
  },
  "3": {
    id: 3,
    username: "tech_philosopher",
    image: "/placeholder.svg?height=50&width=50",
  },
  "4": {
    id: 4,
    username: "nature_wanderer",
    image: "/placeholder.svg?height=50&width=50",
  },
  "5": {
    id: 5,
    username: "book_voyager",
    image: "/placeholder.svg?height=50&width=50",
  },
}

export default function UserMessagePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const user = USERS[userId as keyof typeof USERS]

  // Initialize with empty messages
  useEffect(() => {
    // This would normally fetch messages from an API
    setMessages([])
  }, [userId])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: null,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">User not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">This user doesn't exist or has been removed.</p>
          <Button className="mt-4 rounded-full" onClick={() => router.push("/messages")}>
            Back to Messages
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col messages-doodle-bg">
      {/* Conversation Header */}
      <div className="border-b glass-effect p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full mr-1" onClick={() => router.push("/messages")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 overflow-hidden rounded-full premium-avatar">
            <Image
              src={user.image || "/placeholder.svg"}
              alt={user.username}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-blue-600 dark:text-blue-400">{user.username}</h3>
            <p className="text-xs premium-text-muted">Start a new conversation</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 premium-scrollbar">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center max-w-md">
              <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">No messages yet</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Send a message to start a conversation with {user.username}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.senderId === "me" ? "blue-gradient" : "glass-effect"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>

                  {message.image && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                      <Image
                        src={message.image || "/placeholder.svg"}
                        alt="Message image"
                        width={300}
                        height={200}
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  <span
                    className={`mt-1 block text-right text-xs ${
                      message.senderId === "me" ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t glass-effect p-4">
        <div className="relative flex items-center">
          <Input
            placeholder={`Message ${user.username}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="pr-16 premium-input"
          />
          <div className="absolute right-2">
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
