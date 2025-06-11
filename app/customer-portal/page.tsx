"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  LogIn,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Phone,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react"

type CustomerProject = {
  id: string
  name: string
  status: "Planning" | "In Progress" | "Completed" | "On Hold"
  progress: number
  startDate: string
  endDate: string
  budget: string
  description: string
  projectManager: string
  location: string
  phase: string
  nextMilestone: string
  documents: string[]
}

const customerProjects: CustomerProject[] = [
  {
    id: "1",
    name: "Downtown Network Expansion",
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    budget: "$450,000",
    description: "Expansion of fiber network infrastructure in downtown business district",
    projectManager: "Sarah Johnson",
    location: "Downtown Business District",
    phase: "Implementation",
    nextMilestone: "Phase 3 Testing - Due Feb 15",
    documents: ["Project Plan", "Network Design", "Permits", "Progress Reports"],
  },
  {
    id: "2",
    name: "Residential Complex Fiber Installation",
    status: "Planning",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-06-15",
    budget: "$280,000",
    description: "Complete fiber installation for 200-unit residential complex",
    projectManager: "Mike Wilson",
    location: "Westside Residential Complex",
    phase: "Design & Planning",
    nextMilestone: "Design Approval - Due Jan 30",
    documents: ["Initial Assessment", "Design Proposal", "Cost Estimate"],
  },
  {
    id: "3",
    name: "Industrial Park Connectivity",
    status: "Completed",
    progress: 100,
    startDate: "2023-08-01",
    endDate: "2023-12-15",
    budget: "$650,000",
    description: "High-speed fiber connectivity for industrial park facilities",
    projectManager: "Emily Chen",
    location: "Industrial Park East",
    phase: "Completed",
    nextMilestone: "Project Closed",
    documents: ["Final Report", "As-Built Drawings", "Warranty Info", "User Manual"],
  },
]

export default function CustomerPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Login Error",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    // Simulate login - in real app, this would validate against backend
    if (loginData.email === "customer@metrocomm.com" && loginData.password === "demo123") {
      setIsLoggedIn(true)
      toast({
        title: "Login Successful",
        description: "Welcome to your project portal",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "On Hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Planning":
        return <FileText className="h-4 w-4" />
      case "On Hold":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Customer Portal</CardTitle>
            <CardDescription>Access your fiber deployment projects and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Email: customer@metrocomm.com</p>
              <p>Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Metro Communications</h1>
                <p className="text-sm text-muted-foreground">Customer Portal</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsLoggedIn(false)
                setLoginData({ email: "", password: "" })
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here's an overview of your fiber deployment projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Your Projects</h3>
          {customerProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1">{project.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Location
                    </div>
                    <div className="font-medium">{project.location}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Project Manager
                    </div>
                    <div className="font-medium">{project.projectManager}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Budget
                    </div>
                    <div className="font-medium">{project.budget}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Timeline
                    </div>
                    <div className="font-medium">
                      {new Date(project.startDate).toLocaleDateString()} -{" "}
                      {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    Current Phase: <span className="font-medium">{project.phase}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Next Milestone: <span className="font-medium">{project.nextMilestone}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="text-sm font-medium">Available Documents</div>
                  <div className="flex flex-wrap gap-2">
                    {project.documents.map((doc) => (
                      <Badge key={doc} variant="outline" className="cursor-pointer hover:bg-muted">
                        <FileText className="h-3 w-3 mr-1" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact PM
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Get in touch with your project team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Phone className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-medium">Call Support</div>
                  <div className="text-sm text-muted-foreground">(555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Mail className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-muted-foreground">support@velocityfibre.com</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
