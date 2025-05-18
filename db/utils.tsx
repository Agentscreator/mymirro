const MOCK_USERS = [
  {
    id: 1,
    username: "cosmic_explorer",
    email: "cosmic@example.com",
    passwordHash: "hashed_password",
    profileImage: "/placeholder.svg?height=150&width=150",
    about: "Exploring the intersection of technology, philosophy, and creativity.",
    dateOfBirth: "15/05/1990",
    gender: "male",
    tags: [
      "Philosophy & ideas",
      "Tech & digital life",
      "Explore big ideas",
      "Learn from each other",
      "Science & innovation",
    ],
    joinedDate: new Date("2023-01-15"),
  },
  {
    id: 2,
    username: "mindful_creator",
    email: "mindful@example.com",
    passwordHash: "hashed_password",
    profileImage: "/placeholder.svg?height=150&width=150",
    about: "Finding balance through creativity and mindfulness.",
    dateOfBirth: "22/07/1988",
    gender: "other",
    tags: ["Be creative together", "Mental well-being", "Art & creativity", "Reflect & grow", "Simply be yourself"],
    joinedDate: new Date("2023-02-10"),
  },
]

const MOCK_THOUGHTS = [
  {
    id: 1,
    userId: 1,
    title: "First day at new job",
    content:
      "Today was my first day at the new position. The team seems great, and I'm excited about the projects we'll be working on. The office has an amazing view of the city.",
    createdAt: new Date("2023-09-15T10:30:00Z"),
  },
  {
    id: 2,
    userId: 1,
    title: "Reflection on recent reading",
    content:
      "Just finished 'Atomic Habits' by James Clear. The concept of 1% improvements really resonated with me. I'm going to start implementing some of these ideas in my daily routine.",
    createdAt: new Date("2023-09-10T18:45:00Z"),
  },
  {
    id: 3,
    userId: 1,
    title: "Personal goals for next quarter",
    content:
      "1. Complete the online course on data science\n2. Run a 10k\n3. Read at least 3 books\n4. Meditate daily for 10 minutes",
    createdAt: new Date("2023-09-05T09:15:00Z"),
  },
]

// User-related utilities
export async function createUser(userData: any): Promise<any> {
  try {
    console.log("Using mock data for createUser")
    return {
      id: MOCK_USERS.length + 1,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.passwordHash,
      profileImage: userData.profileImage || "/placeholder.svg?height=150&width=150",
      about: userData.about || "New Mirro user",
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender || "other",
      tags: userData.tags || [],
      joinedDate: new Date(),
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function getUserById(id: number): Promise<any | null> {
  try {
    console.log("Using mock data for getUserById")
    const user = MOCK_USERS.find((u) => u.id === id)
    return user || null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function getUserByUsername(username: string): Promise<any | null> {
  try {
    console.log("Using mock data for getUserByUsername")
    const user = MOCK_USERS.find((u) => u.username === username)
    return user || null
  } catch (error) {
    console.error("Error fetching user by username:", error)
    return null
  }
}

// Thought-related utilities
export async function createThought(thoughtData: any): Promise<any> {
  try {
    console.log("Using mock data for createThought")
    const newThought = {
      id: MOCK_THOUGHTS.length + 1,
      userId: thoughtData.userId,
      title: thoughtData.title,
      content: thoughtData.content,
      createdAt: new Date(),
    }
    MOCK_THOUGHTS.push(newThought)
    return newThought
  } catch (error) {
    console.error("Error creating thought:", error)
    return null
  }
}

export async function getThoughtsByUserId(userId: number): Promise<any[]> {
  try {
    console.log("Using mock data for getThoughtsByUserId")
    return MOCK_THOUGHTS.filter((t) => t.userId === userId)
  } catch (error) {
    console.error("Error fetching thoughts:", error)
    return []
  }
}

export async function getTotalCharacterCount(userId: number): Promise<number> {
  try {
    console.log("Using mock data for getTotalCharacterCount")
    return MOCK_THOUGHTS.filter((t) => t.userId === userId).reduce(
      (total, thought) => total + thought.content.length,
      0,
    )
  } catch (error) {
    console.error("Error calculating character count:", error)
    return 0
  }
}

