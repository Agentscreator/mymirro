"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { PhoneInput } from "@/components/phone-input"
import { DateInput } from "@/components/date-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronRight } from "lucide-react"

// Tag categories
const INTENTION_TAGS = [
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
]

const CONTEXT_TAGS = [
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
]

const INTEREST_TAGS = [
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

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    gender: "male", // Default gender
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [dateOfBirthError, setDateOfBirthError] = useState("")
  const [tagsError, setTagsError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear email error when typing
    if (name === "email") {
      setEmailError("")
    }
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
    setPhoneError("")
  }

  const handleDateOfBirthChange = (value: string) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: value }))
    setDateOfBirthError("")
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
    setTagsError("")
  }

  const validatePhoneNumber = (phone: string) => {
    // Extract just the digits for validation
    const digits = phone.replace(/\D/g, "")
    return digits.length >= 8 && digits.length <= 15
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateTags = () => {
    return selectedTags.length >= 3
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate first step
    if (currentStep === 1) {
      // Validate phone number
      if (!validatePhoneNumber(formData.phoneNumber)) {
        setPhoneError("Please enter a valid phone number (8-15 digits)")
        return
      }

      // Validate email
      if (!validateEmail(formData.email)) {
        setEmailError("Please enter a valid email address")
        return
      }

      // Validate date of birth
      if (!formData.dateOfBirth) {
        setDateOfBirthError("Please enter your date of birth")
        return
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      setCurrentStep(2)
      return
    }

    // Validate second step (tags)
    if (currentStep === 2) {
      if (!validateTags()) {
        setTagsError("Please select at least 3 tags")
        return
      }

      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call to Neon PostgreSQL
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to verification page
    router.push("/verify")
  }

  const getTagColor = (tag: string) => {
    // Generate a consistent color based on the tag string
    const index = tag.length % TAG_COLORS.length
    return TAG_COLORS[index]
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 silver-pattern">
      <Link href="/" className="absolute left-4 top-4 flex items-center gap-2">
        <Logo size="sm" />
        <span className="text-lg font-bold blue-text">Mirro</span>
      </Link>

      <Card className="w-full max-w-md premium-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center blue-text">Create your account</CardTitle>
          <CardDescription className="text-center premium-subheading">
            {currentStep === 1 ? "Enter your information to get started" : "Select at least 3 tags that interest you"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNextStep} className="space-y-4">
            {currentStep === 1 ? (
              <>
                <div className="space-y-2">
                  <Input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`premium-input ${emailError ? "border-red-500" : ""}`}
                  />
                  {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                  <p className="text-xs premium-text-muted">We'll use this for account recovery</p>
                </div>
                <div className="space-y-2">
                  <PhoneInput value={formData.phoneNumber} onChange={handlePhoneChange} error={phoneError} required />
                  <p className="text-xs premium-text-muted">We'll send a verification code to this number</p>
                </div>
                <div className="space-y-2">
                  <DateInput
                    value={formData.dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    error={dateOfBirthError}
                    required
                  />
                  <p className="text-xs premium-text-muted">You must be at least 13 years old to use Mirro</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gender</Label>
                  <RadioGroup
                    defaultValue={formData.gender}
                    onValueChange={handleGenderChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="gender-male" />
                      <Label htmlFor="gender-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="gender-female" />
                      <Label htmlFor="gender-female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="gender-other" />
                      <Label htmlFor="gender-other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="premium-input"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tags (Select at minimum 3)</Label>
                  {tagsError && <p className="text-xs text-red-500">{tagsError}</p>}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} className={`${getTagColor(tag)} cursor-pointer`} onClick={() => toggleTag(tag)}>
                        {tag} <span className="ml-1">×</span>
                      </Badge>
                    ))}
                  </div>

                  <Tabs defaultValue="intention" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="intention">Intention</TabsTrigger>
                      <TabsTrigger value="context">Context</TabsTrigger>
                      <TabsTrigger value="interest">Interest</TabsTrigger>
                    </TabsList>
                    <TabsContent value="intention" className="mt-4">
                      <div className="grid grid-cols-2 gap-2">
                        {INTENTION_TAGS.map((tag) => (
                          <div
                            key={tag}
                            className={`p-2 rounded-md cursor-pointer text-sm transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                            {selectedTags.includes(tag) && <Check className="inline-block ml-1 h-3 w-3" />}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="context" className="mt-4">
                      <div className="grid grid-cols-2 gap-2">
                        {CONTEXT_TAGS.map((tag) => (
                          <div
                            key={tag}
                            className={`p-2 rounded-md cursor-pointer text-sm transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                            {selectedTags.includes(tag) && <Check className="inline-block ml-1 h-3 w-3" />}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="interest" className="mt-4">
                      <div className="grid grid-cols-2 gap-2">
                        {INTEREST_TAGS.map((tag) => (
                          <div
                            key={tag}
                            className={`p-2 rounded-md cursor-pointer text-sm transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                            {selectedTags.includes(tag) && <Check className="inline-block ml-1 h-3 w-3" />}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
            <Button type="submit" className="w-full premium-button" disabled={loading}>
              {loading ? "Creating Account..." : currentStep === 1 ? "Next" : "Create Account"}
              {currentStep === 1 && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm premium-text-muted">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="premium-link">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="premium-link">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="premium-link">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

