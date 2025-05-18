"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface ConnectionPreferencesProps {
  onSave: (preferences: {
    ageRange: [number, number]
    gender: "male" | "female" | "no-preference"
    proximity: "local" | "metro" | "countrywide" | "global"
  }) => void
  defaultValues?: {
    ageRange: [number, number]
    gender: "male" | "female" | "no-preference"
    proximity: "local" | "metro" | "countrywide" | "global"
  }
}

export function ConnectionPreferences({
  onSave,
  defaultValues = {
    ageRange: [13, 65],
    gender: "no-preference",
    proximity: "global",
  },
}: ConnectionPreferencesProps) {
  const [ageRange, setAgeRange] = useState<[number, number]>(defaultValues.ageRange)
  const [gender, setGender] = useState<"male" | "female" | "no-preference">(defaultValues.gender)
  const [proximity, setProximity] = useState<"local" | "metro" | "countrywide" | "global">(defaultValues.proximity)

  const handleSave = () => {
    onSave({
      ageRange,
      gender,
      proximity,
    })
  }

  return (
    <Card className="border border-blue-100 dark:border-blue-900 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">Connection Preferences</CardTitle>
        <CardDescription>Customize who you'd like to connect with</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-base">
            Age Range ({ageRange[0]} - {ageRange[1]})
          </Label>
          <div className="pt-4">
            <Slider
              defaultValue={ageRange}
              min={13}
              max={100}
              step={1}
              onValueChange={(value) => setAgeRange(value as [number, number])}
              className="bg-blue-100 dark:bg-blue-900/50"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>13</span>
            <span>100+</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base">Gender Preference</Label>
          <RadioGroup
            defaultValue={gender}
            onValueChange={(value) => setGender(value as "male" | "female" | "no-preference")}
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
              <RadioGroupItem value="no-preference" id="gender-any" />
              <Label htmlFor="gender-any">No Preference</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-base">Proximity</Label>
          <RadioGroup
            defaultValue={proximity}
            onValueChange={(value) => setProximity(value as "local" | "metro" | "countrywide" | "global")}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="proximity-local" />
              <Label htmlFor="proximity-local">Local (within 25 km)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metro" id="proximity-metro" />
              <Label htmlFor="proximity-metro">Metro Area (within 100 km)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="countrywide" id="proximity-country" />
              <Label htmlFor="proximity-country">Countrywide</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="global" id="proximity-global" />
              <Label htmlFor="proximity-global">Global</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          onClick={handleSave}
          className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Check className="mr-2 h-4 w-4" /> Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}
