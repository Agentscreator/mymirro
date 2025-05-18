"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock conversation data
const CONVERSATIONS = [
  {
    id: 1,
    username: "mindful_creator",
    image: "/placeholder.svg?height=50&width=50",
    lastMessage: "That meditation technique you shared was really helpful. I've been practicing it daily.",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    username: "tech_philosopher",
    image: "/placeholder.svg?height=50&width=50",
    lastMessage: "I just read that article you recommended on AI ethics. Let's discuss it sometime.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    username: "nature_wanderer",
    image: "/placeholder.svg?height=50&width=50",
    lastMessage: "Here are the photos from our hike last weekend. The sunset was amazing!",
    timestamp: "Monday",
    unread: false,
  },
]

// Mock messages for the active conversation
const MESSAGES = [
  {
    id: 1,
    senderId: 1, // mindful_creator
    content: "Hey there! How's your meditation practice going?",
    timestamp: "10:15 AM",
    image: null,
  },
  {
    id: 2,
    senderId: "me",
    content: "It's been really good actually. I've been consistent with it for the past week.",
    timestamp: "10:20 AM",
    image: null,
  },
  {
    id: 3,
    senderId: 1,
    content: "That's great to hear! Have you noticed any changes in your focus or stress levels?",
    timestamp: "10:22 AM",
    image: null,
  },
  {
    id: 4,
    senderId: "me",
    content:
      "Definitely. I feel more centered throughout the day, and it's easier to stay focused on tasks without getting distracted.",
    timestamp: "10:25 AM",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    senderId: 1,
    content: "That meditation technique you shared was really helpful. I've been practicing it daily.",
    timestamp: "10:30 AM",
    image: null,
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(CONVERSATIONS[0])
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(MESSAGES)
  const [searchQuery, setSearchQuery] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const filteredConversations = CONVERSATIONS.filter((convo) =>
    convo.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() && !imagePreview) return

const message = imagePreview
  ? {
      id: Date.now(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: imagePreview, // string
    }
  : {
      id: Date.now(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: null, // null
    };


  const handleImageChange = (file: File | null) => {
    setImageFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row messages-doodle-bg">
      {/* Conversation List */}
      <div className="border-r glass-effect md:w-80">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 premium-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredConversations.map((convo) => (
              <Link href={`/messages/${convo.id}`} key={convo.id}>
                <div
                  className={`cursor-pointer rounded-xl p-3 transition-colors hover:bg-blue-500/10 ${
                    activeConversation.id === convo.id ? "bg-blue-500/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 overflow-hidden rounded-full premium-avatar">
                        <Image
                          src={convo.image || "/placeholder.svg"}
                          alt={convo.username}
                          width={50}
                          height={50}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {convo.unread && (
                        <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-blue-500 blue-glow"></span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">{convo.username}</h3>
                        <span className="text-xs premium-text-muted">{convo.timestamp}</span>
                      </div>
                      <p className="truncate text-sm premium-text-muted">{convo.lastMessage}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Message Area - Empty State */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <MessageIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Your Messages</h2>
        <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
          Select a conversation from the sidebar or start a new one by messaging a user from the Discover page.
        </p>
      </div>
    </div>
  )
}

// Message icon component
function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

}