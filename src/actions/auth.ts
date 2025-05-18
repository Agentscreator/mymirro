"use server"

import { cookies } from "next/headers"
import { createUser, getUserByUsername } from "@/db/utils"
import bcrypt from "bcryptjs"

type SignupData = {
  username: string
  email: string
  password: string
  dateOfBirth: string
}

type LoginData = {
  username: string
  password: string
}

export async function signup(data: SignupData) {
  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(data.password, 10)

    // Create the user
    const user = await createUser({
      username: data.username,
      email: data.email,
      passwordHash,
      dateOfBirth: data.dateOfBirth,
    })

    if (!user) {
      return { success: false, error: "Failed to create user" }
    }

    // Set a cookie to authenticate the user
    cookies().set("auth-token", "demo-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Error during signup:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function login(data: LoginData) {
  try {
    // For demo purposes, we'll still allow the hardcoded credentials
    if (data.username === "1234" && data.password === "12345678") {
      cookies().set("auth-token", "demo-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
      return { success: true }
    }

    // Get the user from the database
    const user = await getUserByUsername(data.username)

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(data.password, user.passwordHash)

    if (!passwordMatch) {
      return { success: false, error: "Invalid credentials" }
    }

    // Set a cookie to authenticate the user
    cookies().set("auth-token", "demo-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Error during login:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function logout() {
  cookies().delete("auth-token")
  return { success: true }
}
