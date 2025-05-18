"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit, Send, Heart, MessageCircle, Share2, Users, Plus } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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

// Mock user data
const USER = {
  username: "cosmic_explorer",
  image: "/placeholder.svg?height=150&width=150",
  about:
    "Exploring the intersection of technology, philosophy, and creativity. Passionate about connecting with like-minded individuals who are curious about the world and open to deep conversations.",
  connections: 248,
  gender: "male",
  tags: [
    "Philosophy & ideas",
    "Tech & digital life",
    "Explore big ideas",
    "Learn from each other",
    "Science & innovation",
  ],
  posts: [
    {
      id: 1,
      content:
        "Just finished reading 'The Anthropocene Reviewed' by John Green. His way of rating different facets of the human experience on a five-star scale is both profound and whimsical. Highly recommend!",
      createdAt: "2023-10-15T14:30:00Z",
      image: null,
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      content:
        "Spent the weekend hiking at Mount Rainier. The wildflowers were in full bloom, creating a tapestry of colors against the backdrop of the snow-capped peak. Nature's beauty never ceases to amaze me.",
      createdAt: "2023-10-10T09:15:00Z",
      image: "/placeholder.svg?height=400&width=600",
      likes: 42,
      comments: 8,
    },
    {
      id: 3,
      content:
        "Attended a fascinating lecture on quantum computing today. The potential applications in medicine and climate science are particularly exciting. Still trying to wrap my head around quantum entanglement though!",
      createdAt: "2023-10-05T18:45:00Z",
      image: null,
      likes: 18,
      comments: 3,
    },
  ],
}

export default function ProfilePage() {
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState(USER.posts)
  const [isEditing, setIsEditing] = useState(false)
  const [about, setAbout] = useState(USER.about)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [userTags, setUserTags] = useState(USER.tags)
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)

  const handlePostSubmit = () => {
    if (!newPost.trim() && !imagePreview) return

    const newPostObj = {
      id: Date.now(),
      content: newPost,
      createdAt: new Date().toISOString(),
      image: imagePreview,
      likes: 0,
      comments: 0,
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
    setImageFile(null)
    setImagePreview(null)
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTagColor = (tag: string) => {
    // Generate a consistent color based on the tag string
    const index = tag.length % TAG_COLORS.length
    return TAG_COLORS[index]
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:gap-8">
        <div className="mb-4 md:mb-0">
          <div className="relative h-36 w-36 overflow-hidden rounded-full bg-primary/10 shadow-lg">
            <Image src={USER.image || "/placeholder.svg"} alt={USER.username} fill className="object-cover" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold neon-text">{USER.username}</h1>
            <div className="mt-2 flex items-center justify-center gap-4 md:mt-0 md:justify-start">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium">{USER.connections}</span>
                <span className="text-sm text-muted-foreground">connections</span>
              </div>
            </div>
          </div>

          {/* User tags */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
            {userTags.map((tag) => (
              <Badge key={tag} className={getTagColor(tag)}>
                {tag}
              </Badge>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-6 px-2"
              onClick={() => setIsTagDialogOpen(true)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Tags
            </Button>
          </div>

          <div className="mt-4">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="min-h-[100px] rounded-xl bg-background/50"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="rounded-full bg-background/50"
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => setIsEditing(false)} className="rounded-full holographic-gradient">
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl bg-background/90 backdrop-blur-md p-4">
                <p className="text-sm">{about}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 rounded-full hover:bg-primary/20"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-full bg-background/90 backdrop-blur-md">
          <TabsTrigger
            value="posts"
            className="rounded-full data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="connections"
            className="rounded-full data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Connections
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="mb-6">
            <div className="relative">
              <Textarea
                placeholder="Share what's on your mind..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] pr-12 rounded-xl bg-background/90 backdrop-blur-md"
              />
              <Button
                className="absolute bottom-3 right-3 rounded-full holographic-gradient"
                size="icon"
                onClick={handlePostSubmit}
                disabled={!newPost.trim() && !imagePreview}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <ImageUpload onImageChange={handleImageChange} imagePreview={imagePreview} />
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="rounded-xl bg-background/90 backdrop-blur-md overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={USER.image || "/placeholder.svg"}
                        alt={USER.username}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-primary">{USER.username}</h3>
                        <span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
                      </div>
                      <p className="mt-2 text-sm">{post.content}</p>

                      {post.image && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            width={500}
                            height={300}
                            className="w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 rounded-full hover:bg-primary/10"
                        >
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 rounded-full hover:bg-primary/10"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 rounded-full hover:bg-primary/10"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="connections" className="mt-6">
          <div className="rounded-xl bg-background/90 backdrop-blur-md p-8 text-center">
            <div className="mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">{USER.connections}</span>
            </div>
            <h3 className="text-lg font-medium neon-text">Connections</h3>
            <p className="mt-2 text-sm text-muted-foreground">View and manage your connections here.</p>
          </div>
        </TabsContent>
      </Tabs>
      {/* Tag Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Tags</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Intention</h3>
              <div className="flex flex-wrap gap-2">
                {[
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
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant={userTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (userTags.includes(tag)) {
                        setUserTags(userTags.filter((t) => t !== tag))
                      } else {
                        setUserTags([...userTags, tag])
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Context</h3>
              <div className="flex flex-wrap gap-2">
                {[
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
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant={userTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (userTags.includes(tag)) {
                        setUserTags(userTags.filter((t) => t !== tag))
                      } else {
                        setUserTags([...userTags, tag])
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Interest</h3>
              <div className="flex flex-wrap gap-2">
                {[
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
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant={userTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (userTags.includes(tag)) {
                        setUserTags(userTags.filter((t) => t !== tag))
                      } else {
                        setUserTags([...userTags, tag])
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTagDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

