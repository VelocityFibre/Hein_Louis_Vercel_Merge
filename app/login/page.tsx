"use client"

import { useState } from "react"
import { useAuth, predefinedUsers } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, LogIn } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const { login } = useAuth()
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(predefinedUsers[0]?.id)
  // const [email, setEmail] = useState(''); // If using email input instead of select
  // const [password, setPassword] = useState(''); // Basic password field

  const handleLogin = () => {
    if (!selectedUserId) {
      toast.error("Please select a user.")
      return
    }
    const userToLogin = predefinedUsers.find((u) => u.id === selectedUserId)
    if (userToLogin) {
      login(userToLogin)
      toast.success(`Welcome, ${userToLogin.name}!`)
    } else {
      toast.error("Selected user not found.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Velocity Fibre</CardTitle>
          <CardDescription>Project Management Portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user-select">Select User Account</Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger id="user-select">
                <SelectValue placeholder="Select a user to log in" />
              </SelectTrigger>
              <SelectContent>
                {predefinedUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Example of Email/Password fields if you prefer that route
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          */}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
