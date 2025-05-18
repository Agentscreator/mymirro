"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserCard } from "@/components/user-card"
import { ConnectionPreferences } from "@/components/connection-preferences"
import { Badge } from "@/components/ui/badge"

// Tag categories for filtering
const ALL_TAGS = [
  // Intention tags
  "Make meaningful connections",
  "Share your story",
  "Reflect & grow",
  "Navigate change",
  "Celebrate joy",
  "Find or offer support",
  "Explore big ideas",
  "Be creative together",
  "Learn from each other",
  "Uplift and be uplifted",
  "Build shared purpose",
  "Simply be yourself",

  // Context tags
  "Experiencing burnout",
  "Starting fresh",
  "Navigating change",
  "New to a place",
  "Healing from loss",
  "Looking for meaning",
  "Feeling overwhelmed",
  "Celebrating success",
  "Facing uncertainty",
  "Entering adulthood",
  "Career crossroads",
  "Reinventing my path",
  "Launching a project",
  "Seeking belonging",
  "Feeling disconnected",

  // Interest tags
  "Life & meaning",
  "Mental well-being",
  "Relationships & connection",
  "Culture & identity",
  "Spirituality & faith",
  "Books & stories",
  "Climate & sustainability",
  "Music & sound",
  "Art & creativity",
  "Science & innovation",
  "Tech & digital life",
  "Social impact & justice",
  "Business & entrepreneurship",
  "Learning & education",
  "Philosophy & ideas",
  "Parenting & caregiving",
  "Love & heartbreak",
  "Migration & home",
  "Food & traditions",
  "Politics & society",
]

// Mock user data with updated recommendation format and tags
const USERS = [
  {
    id: 1,
    username: "belle_explorer",
    image: "/placeholder.svg?height=100&width=100",
    reason:
      "Belle uses Mirro to remember who she was when the world told her to forget. Her journal entries about self-discovery and resilience mirror your own journey of finding authenticity in a world that often demands conformity. The way she describes her hiking adventures and moments of clarity while surrounded by nature resonates with your own reflections.\n\nYou both share a deep appreciation for literature that explores identity and transformation. Her perspective on coming-of-age stories could complement your interest in narratives about personal growth and self-acceptance. You're both navigating similar life transitions with thoughtfulness and introspection.",
    tags: ["Share your story", "Reflect & grow", "Books & stories", "Seeking belonging", "Nature & outdoors"],
    gender: "female",
  },
  {
    id: 2,
    username: "mindful_creator",
    image: "/placeholder.svg?height=100&width=100",
    reason:
      "Alex documents their creative process through thoughtful reflections, capturing moments of inspiration and struggle alike. Their entries about finding balance between structure and spontaneity in art mirror your own creative journey.\n\nYour shared passion for mindfulness practices and creative expression suggests a potential meaningful connection. Their experience with meditation retreats aligns with your interest in developing a consistent practice, while their approach to integrating creativity into daily life complements your exploration of artistic expression as a form of self-discovery.",
    tags: ["Be creative together", "Mental well-being", "Art & creativity", "Reflect & grow", "Simply be yourself"],
    gender: "other",
  },
  {
    id: 3,
    username: "tech_philosopher",
    image: "/placeholder.svg?height=100&width=100",
    reason:
      "Jordan's reflections on technology's role in shaping human connection reveal a thoughtful perspective that parallels your own questioning. Their entries about digital minimalism and intentional technology use echo your recent thoughts about finding authenticity in an increasingly virtual world.\n\nBoth of you explore the ethical implications of technology in society. Their background in AI ethics could provide valuable insights to your questions about the future of human-computer interaction, while your practical experience with digital communities would complement their theoretical framework about technology's impact on human relationships.",
    tags: [
      "Tech & digital life",
      "Philosophy & ideas",
      "Explore big ideas",
      "Science & innovation",
      "Ethics & society",
    ],
    gender: "male",
  },
  {
    id: 4,
    username: "nature_wanderer",
    image: "/placeholder.svg?height=100&width=100",
    reason:
      "Morgan's journal entries about solitude in nature capture the same sense of reverence and wonder that appears in your own reflections. Their detailed observations of changing seasons and wildlife encounters mirror your attentiveness to the natural world.\n\nYour shared love for hiking and nature photography creates a strong foundation for connection. They've explored trails in your region and could introduce you to hidden gems you haven't discovered yet, while your knowledge of ecological systems would complement their experiential understanding of natural environments.",
    tags: ["Climate & sustainability", "Reflect & grow", "Simply be yourself", "New to a place", "Outdoor adventures"],
    gender: "female",
  },
  {
    id: 5,
    username: "book_voyager",
    image: "/placeholder.svg?height=100&width=100",
    reason:
      "Riley's thoughtful analyses of literature reveal a mind that engages with text in ways similar to your own approach. Their reflections on how certain books have shaped their worldview parallel your own literary journey and the transformative power you find in stories.\n\nYour reading lists overlap significantly, particularly in speculative fiction and philosophy. Their perspective on authors you both enjoy could open new interpretations you haven't considered, while your historical knowledge would provide context for their contemporary literary interests.",
    tags: ["Books & stories", "Learn from each other", "Philosophy & ideas", "Culture & identity", "Share your story"],
    gender: "male",
  },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleUsers, setVisibleUsers] = useState(2)
  const [showPreferences, setShowPreferences] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [connectionPreferences, setConnectionPreferences] = useState({
    ageRange: [18, 65] as [number, number],
    gender: "no-preference" as "male" | "female" | "no-preference",
    proximity: "global" as "local" | "metro" | "countrywide" | "global",
  })
  const [showAllTags, setShowAllTags] = useState(false)

  const handleSavePreferences = (preferences: {
    ageRange: [number, number]
    gender: "male" | "female" | "no-preference"
    proximity: "local" | "metro" | "countrywide" | "global"
  }) => {
    setConnectionPreferences(preferences)
    setShowPreferences(false)
    // In a real app, we would save these preferences to the database and refetch filtered results
    console.log("Saved connection preferences:", preferences)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const filteredUsers = USERS.filter((user) => {
    // Filter by search query
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by gender preference
    const matchesGender =
      connectionPreferences.gender === "no-preference" || user.gender === connectionPreferences.gender

    // Filter by tags (if any selected)
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => user.tags.includes(tag))

    return matchesSearch && matchesGender && matchesTags
  }).slice(0, visibleUsers)

  const loadMore = () => {
    setVisibleUsers((prev) => Math.min(prev + 2, USERS.length))
  }

  // Tag colors
  const getTagColor = (tag: string) => {
    const colors = [
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
    // Generate a consistent color based on the tag string
    const index = tag.length % colors.length
    return colors[index]
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="mb-6 text-3xl font-bold text-blue-600 dark:text-blue-400">Discover</h1>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for users..."
          className="pl-10 rounded-full border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <div className="text-sm text-muted-foreground">Active filters:</div>
          <div className="text-sm bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            Age: {connectionPreferences.ageRange[0]}-{connectionPreferences.ageRange[1]}
          </div>
          <div className="text-sm bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            Gender: {connectionPreferences.gender === "no-preference" ? "Any" : connectionPreferences.gender}
          </div>
          <div className="text-sm bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            Proximity: {connectionPreferences.proximity}
          </div>

          {selectedTags.map((tag) => (
            <Badge key={tag} className={`${getTagColor(tag)} cursor-pointer`} onClick={() => toggleTag(tag)}>
              {tag} <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
        <Button
          variant="outline"
          className="rounded-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30"
          onClick={() => setShowPreferences(!showPreferences)}
        >
          Edit Preferences
        </Button>
      </div>

      {showPreferences && (
        <div className="mb-8">
          <ConnectionPreferences onSave={handleSavePreferences} defaultValues={connectionPreferences} />
        </div>
      )}

      {/* Tag selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Filter by tags</h2>
        <div className="flex flex-wrap gap-2">
          {(showAllTags ? ALL_TAGS : ALL_TAGS.slice(0, 15)).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          {!showAllTags && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setShowAllTags(true)}>
              + More tags
            </Badge>
          )}
          {showAllTags && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setShowAllTags(false)}>
              - Show less
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {visibleUsers < USERS.length && (
          <div className="flex justify-center">
            <Button
              onClick={loadMore}
              variant="outline"
              className="rounded-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
