"use client"

import { useState, useEffect } from "react"
import { Lock, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/utils"
import { createThought, getThoughtsByUserId, getTotalCharacterCount } from "@/db/utils"
import type { Thought } from "@/db/schema"
import { ConnectionPreferences } from "@/components/connection-preferences"

// Constants for character limits
const MAX_TOTAL_CHARS = 20000
const MAX_THOUGHT_CHARS = 2500

// Mock user ID for demo purposes
const DEMO_USER_ID = 1

// Mock thoughts for development/preview
const MOCK_THOUGHTS = [
  {
    id: 1,
    userId: DEMO_USER_ID,
    title: "First day at new job",
    content:
      "Today was my first day at the new position. The team seems great, and I'm excited about the projects we'll be working on. The office has an amazing view of the city.",
    createdAt: new Date("2023-09-15T10:30:00Z"),
  },
  {
    id: 2,
    userId: DEMO_USER_ID,
    title: "Reflection on recent reading",
    content:
      "Just finished 'Atomic Habits' by James Clear. The concept of 1% improvements really resonated with me. I'm going to start implementing some of these ideas in my daily routine.",
    createdAt: new Date("2023-09-10T18:45:00Z"),
  },
  {
    id: 3,
    userId: DEMO_USER_ID,
    title: "Personal goals for next quarter",
    content:
      "1. Complete the online course on data science\n2. Run a 10k\n3. Read at least 3 books\n4. Meditate daily for 10 minutes",
    createdAt: new Date("2023-09-05T09:15:00Z"),
  },
]

export default function TheMirrorPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [newThought, setNewThought] = useState({
    title: "",
    content: "",
  })
  const [editingThought, setEditingThought] = useState<Thought | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [thoughtsCharCount, setThoughtsCharCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showPreferences, setShowPreferences] = useState(false)
  const [connectionPreferences, setConnectionPreferences] = useState({
    ageRange: [18, 65] as [number, number],
    gender: "no-preference" as "male" | "female" | "no-preference",
    proximity: "global" as "local" | "metro" | "countrywide" | "global",
  })

  // Calculate derived values
  const remainingChars = MAX_TOTAL_CHARS - thoughtsCharCount
  const usagePercentage = (thoughtsCharCount / MAX_TOTAL_CHARS) * 100

  // Fetch thoughts on component mount
  useEffect(() => {
    async function fetchThoughts() {
      try {
        setIsLoading(true)
        // In a real app, we would get the user ID from authentication
        const fetchedThoughts = await getThoughtsByUserId(DEMO_USER_ID)
        const charCount = await getTotalCharacterCount(DEMO_USER_ID)

        if (fetchedThoughts.length > 0) {
          setThoughts(fetchedThoughts)
          setThoughtsCharCount(charCount)
        } else {
          // Use mock data if no thoughts are returned
          setThoughts(MOCK_THOUGHTS)
          setThoughtsCharCount(MOCK_THOUGHTS.reduce((total, thought) => total + thought.content.length, 0))
        }
      } catch (error) {
        console.error("Error fetching thoughts:", error)
        // For demo purposes, use mock data if fetching fails
        setThoughts(MOCK_THOUGHTS)
        setThoughtsCharCount(MOCK_THOUGHTS.reduce((total, thought) => total + thought.content.length, 0))
      } finally {
        setIsLoading(false)
      }
    }

    fetchThoughts()
  }, [])

  const handleAddThought = async () => {
    if (!newThought.title || !newThought.content) return

    // Check if adding this thought would exceed the total character limit
    if (newThought.content.length > remainingChars) {
      alert(`You only have ${remainingChars} characters remaining. This thought is too long.`)
      return
    }

    try {
      // In a real app, we would get the user ID from authentication
      const thought = await createThought({
        userId: DEMO_USER_ID,
        title: newThought.title,
        content: newThought.content,
      })

      if (thought) {
        setThoughts([thought, ...thoughts])
        setThoughtsCharCount(thoughtsCharCount + newThought.content.length)
        setNewThought({
          title: "",
          content: "",
        })
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error("Error adding thought:", error)
      // For demo purposes, add a local thought if the API call fails
      const mockThought: Thought = {
        id: Date.now(),
        userId: DEMO_USER_ID,
        title: newThought.title,
        content: newThought.content,
        createdAt: new Date(),
      }

      setThoughts([mockThought, ...thoughts])
      setThoughtsCharCount(thoughtsCharCount + newThought.content.length)
      setNewThought({
        title: "",
        content: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditThought = async () => {
    if (!editingThought || !editingThought.title || !editingThought.content) return

    // Find the original thought to calculate character difference
    const originalThought = thoughts.find((t) => t.id === editingThought.id)
    if (!originalThought) return

    // Calculate the difference in character count
    const charDifference = editingThought.content.length - originalThought.content.length

    // Check if editing this thought would exceed the total character limit
    if (charDifference > 0 && charDifference > remainingChars) {
      alert(`You only have ${remainingChars} characters remaining. This edit adds too many characters.`)
      return
    }

    try {
      // In a real app, we would update the thought in the database
      // For now, we'll just update it locally
      const updatedThoughts = thoughts.map((t) => (t.id === editingThought.id ? editingThought : t))

      setThoughts(updatedThoughts)
      setThoughtsCharCount(thoughtsCharCount + charDifference)
      setEditingThought(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error editing thought:", error)
      // For demo purposes, update locally if the API call fails
      const updatedThoughts = thoughts.map((t) => (t.id === editingThought.id ? editingThought : t))

      setThoughts(updatedThoughts)
      setThoughtsCharCount(thoughtsCharCount + charDifference)
      setEditingThought(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteThought = async (id: number) => {
    // Find the thought to calculate character count reduction
    const thoughtToDelete = thoughts.find((t) => t.id === id)
    if (!thoughtToDelete) return

    try {
      // In a real app, we would delete the thought from the database
      // For now, we'll just delete it locally
      const updatedThoughts = thoughts.filter((t) => t.id !== id)

      setThoughts(updatedThoughts)
      setThoughtsCharCount(thoughtsCharCount - thoughtToDelete.content.length)
    } catch (error) {
      console.error("Error deleting thought:", error)
      // For demo purposes, delete locally if the API call fails
      const updatedThoughts = thoughts.filter((t) => t.id !== id)

      setThoughts(updatedThoughts)
      setThoughtsCharCount(thoughtsCharCount - thoughtToDelete.content.length)
    }
  }

  const handleSavePreferences = (preferences: {
    ageRange: [number, number]
    gender: "male" | "female" | "no-preference"
    proximity: "local" | "metro" | "countrywide" | "global"
  }) => {
    setConnectionPreferences(preferences)
    setShowPreferences(false)
    // In a real app, we would save these preferences to the database
    console.log("Saved connection preferences:", preferences)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">The Mirror</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30"
          onClick={() => setShowPreferences(!showPreferences)}
        >
          Connection Preferences
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              New Thought
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] rounded-xl bg-background/90 backdrop-blur-md border border-blue-200 dark:border-blue-900">
            <DialogHeader>
              <DialogTitle className="text-blue-600 dark:text-blue-400">Create New Thought</DialogTitle>
              <DialogDescription>
                Add a new thought to your mirror. These thoughts help Mirro generate connection recommendations.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newThought.title}
                  onChange={(e) => setNewThought({ ...newThought, title: e.target.value })}
                  placeholder="Give your thought a title"
                  className="rounded-full bg-background/50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newThought.content}
                  onChange={(e) => {
                    // Limit the content to MAX_THOUGHT_CHARS
                    const content = e.target.value.slice(0, MAX_THOUGHT_CHARS)
                    setNewThought({ ...newThought, content })
                  }}
                  placeholder="Write your thought here..."
                  className="min-h-[150px] rounded-xl bg-background/50"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className={newThought.content.length >= MAX_THOUGHT_CHARS ? "text-red-500" : ""}>
                    {newThought.content.length}/{MAX_THOUGHT_CHARS} characters
                  </span>
                  <span>{remainingChars} characters remaining in total</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="rounded-full bg-background/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddThought}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={!newThought.title || !newThought.content || newThought.content.length > MAX_THOUGHT_CHARS}
              >
                Save Thought
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-8">
        <Card className="rounded-xl bg-card shadow-sm border border-blue-100 dark:border-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">Thoughts</CardTitle>
            <CardDescription>Your thoughts help Mirro generate meaningful connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-background/50 p-3 border border-blue-50 dark:border-blue-900/50">
                <span>Character Usage</span>
                <div className="text-right">
                  <span className="font-medium">{thoughtsCharCount}</span>
                  <span className="text-muted-foreground"> / {MAX_TOTAL_CHARS}</span>
                </div>
              </div>
              <Progress value={usagePercentage} className="h-2 w-full bg-blue-100 dark:bg-blue-900/50">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500"
                  style={{ width: `${Math.min(100, usagePercentage)}%` }}
                />
              </Progress>
              <div className="text-xs text-muted-foreground text-right">{remainingChars} characters remaining</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPreferences && (
        <div className="mb-8">
          <ConnectionPreferences onSave={handleSavePreferences} defaultValues={connectionPreferences} />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading thoughts...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {thoughts.length === 0 ? (
            <div className="rounded-xl bg-background/50 p-8 text-center border border-blue-100 dark:border-blue-900">
              <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400">No thoughts yet</h3>
              <p className="mt-2 text-muted-foreground">
                Your thoughts will appear here. Click "New Thought" to get started.
              </p>
            </div>
          ) : (
            thoughts.map((thought) => (
              <Card
                key={thought.id}
                className="rounded-xl bg-card shadow-sm border border-blue-100 dark:border-blue-900"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-600 dark:text-blue-400">{thought.title}</CardTitle>
                      <CardDescription>{formatDate(thought.createdAt)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{thought.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Dialog
                    open={isEditDialogOpen && editingThought?.id === thought.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (!open) setEditingThought(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingThought(thought)}
                        className="rounded-full bg-background/50 border-blue-200 dark:border-blue-800"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] rounded-xl bg-background/90 backdrop-blur-md border border-blue-200 dark:border-blue-900">
                      <DialogHeader>
                        <DialogTitle className="text-blue-600 dark:text-blue-400">Edit Thought</DialogTitle>
                      </DialogHeader>
                      {editingThought && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editingThought.title}
                              onChange={(e) => setEditingThought({ ...editingThought, title: e.target.value })}
                              className="rounded-full bg-background/50"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-content">Content</Label>
                            <Textarea
                              id="edit-content"
                              value={editingThought.content}
                              onChange={(e) => {
                                // Limit the content to MAX_THOUGHT_CHARS
                                const content = e.target.value.slice(0, MAX_THOUGHT_CHARS)
                                setEditingThought({ ...editingThought, content })
                              }}
                              className="min-h-[150px] rounded-xl bg-background/50"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span
                                className={editingThought.content.length >= MAX_THOUGHT_CHARS ? "text-red-500" : ""}
                              >
                                {editingThought.content.length}/{MAX_THOUGHT_CHARS} characters
                              </span>
                              <span>
                                {remainingChars +
                                  (thoughts.find((t) => t.id === editingThought.id)?.content.length || 0) -
                                  editingThought.content.length}{" "}
                                characters remaining in total
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingThought(null)
                            setIsEditDialogOpen(false)
                          }}
                          className="rounded-full bg-background/50"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleEditThought}
                          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                          disabled={
                            !editingThought?.title ||
                            !editingThought?.content ||
                            editingThought?.content.length > MAX_THOUGHT_CHARS
                          }
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteThought(thought.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
