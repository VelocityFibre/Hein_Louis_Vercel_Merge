import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Building,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  FileText,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const projectData = {
  1: {
    id: 1,
    name: "Westside Fiber Deployment",
    customer: {
      name: "City of Westside",
      contact: "Jane Smith",
      email: "jane.smith@westside.gov",
      phone: "+1 (555) 123-4567",
    },
    location: "Westside District",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "In Progress",
    phase: "Implementation",
    progress: 65,
    manager: "John Doe",
    description:
      "Complete fiber optic network deployment across the Westside District, including residential and commercial areas. This project involves installing 50km of fiber cable, 200 connection points, and establishing 5 distribution hubs.",
    budget: 2500000,
    spent: 1625000,
    phases: [
      { name: "Planning", status: "completed", progress: 100, startDate: "2024-01-15", endDate: "2024-02-01" },
      { name: "Design", status: "completed", progress: 100, startDate: "2024-02-01", endDate: "2024-02-28" },
      { name: "Implementation", status: "active", progress: 65, startDate: "2024-03-01", endDate: "2024-05-31" },
      { name: "Testing", status: "pending", progress: 0, startDate: "2024-06-01", endDate: "2024-06-15" },
      { name: "Deployment", status: "pending", progress: 0, startDate: "2024-06-16", endDate: "2024-06-30" },
    ],
    tasks: [
      {
        id: 1,
        title: "Complete pole permissions",
        assignee: "John Doe",
        dueDate: "2024-01-20",
        status: "In Progress",
        priority: "High",
        phase: "Implementation",
      },
      {
        id: 2,
        title: "Install fiber cables - Section A",
        assignee: "Mike Wilson",
        dueDate: "2024-01-25",
        status: "Not Started",
        priority: "Medium",
        phase: "Implementation",
      },
      {
        id: 3,
        title: "Site survey validation",
        assignee: "John Doe",
        dueDate: "2024-01-18",
        status: "Completed",
        priority: "Medium",
        phase: "Implementation",
      },
    ],
    materials: [
      { name: "Fiber Optic Cable", required: 50000, used: 32500, unit: "meters" },
      { name: "Connection Points", required: 200, used: 130, unit: "units" },
      { name: "Distribution Hubs", required: 5, used: 3, unit: "units" },
      { name: "Splice Enclosures", required: 150, used: 95, unit: "units" },
    ],
    contractors: [
      { name: "FiberTech Solutions", role: "Installation", performance: 92 },
      { name: "Network Specialists Inc", role: "Testing", performance: 88 },
      { name: "Cable Masters", role: "Maintenance", performance: 95 },
    ],
  },
  // Add other projects...
  2: {
    id: 2,
    name: "Downtown Network Expansion",
    customer: {
      name: "Metro Communications",
      contact: "Robert Johnson",
      email: "r.johnson@metrocomm.com",
      phone: "+1 (555) 234-5678",
    },
    location: "Downtown Core",
    startDate: "2024-02-01",
    endDate: "2024-07-15",
    status: "In Progress",
    phase: "Testing",
    progress: 80,
    manager: "Sarah Johnson",
    description:
      "Expansion of existing fiber network in downtown core area to support increased bandwidth demands from commercial clients.",
    budget: 1800000,
    spent: 1440000,
    phases: [
      { name: "Planning", status: "completed", progress: 100, startDate: "2024-02-01", endDate: "2024-02-15" },
      { name: "Design", status: "completed", progress: 100, startDate: "2024-02-15", endDate: "2024-03-15" },
      { name: "Implementation", status: "completed", progress: 100, startDate: "2024-03-15", endDate: "2024-06-01" },
      { name: "Testing", status: "active", progress: 60, startDate: "2024-06-01", endDate: "2024-06-30" },
      { name: "Deployment", status: "pending", progress: 0, startDate: "2024-07-01", endDate: "2024-07-15" },
    ],
    tasks: [
      {
        id: 4,
        title: "Network performance testing",
        assignee: "Sarah Johnson",
        dueDate: "2024-01-22",
        status: "In Progress",
        priority: "High",
        phase: "Testing",
      },
    ],
    materials: [
      { name: "Fiber Optic Cable", required: 30000, used: 28500, unit: "meters" },
      { name: "Network Switches", required: 15, used: 15, unit: "units" },
    ],
    contractors: [{ name: "Metro Fiber Corp", role: "Installation", performance: 94 }],
  },
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projectData[Number.parseInt(params.id) as keyof typeof projectData]

  if (!project) {
    return <div>Project not found</div>
  }

  const completedTasks = project.tasks.filter((task) => task.status === "Completed")
  const activeTasks = project.tasks.filter((task) => task.status !== "Completed")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-2">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
          <Link href={`/projects/${project.id}/edit`}>
            <Button>Edit Project</Button>
          </Link>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(project.spent / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">of ${(project.budget / 1000000).toFixed(1)}M budget</p>
            <Progress value={(project.spent / project.budget) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTasks.length}</div>
            <p className="text-xs text-muted-foreground">{completedTasks.length} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Phase</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.phase}</div>
            <p className="text-xs text-muted-foreground">
              {project.phases.find((p) => p.status === "active")?.progress}% complete
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="phases">Phases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="contractors">Contractors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Project Manager: {project.manager}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Budget: ${(project.budget / 1000000).toFixed(1)}M</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Contact: {project.customer.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.customer.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <div className="space-y-4">
            {project.phases.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                    <Badge
                      variant={
                        phase.status === "completed" ? "default" : phase.status === "active" ? "secondary" : "outline"
                      }
                    >
                      {phase.status === "completed"
                        ? "Completed"
                        : phase.status === "active"
                          ? "In Progress"
                          : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Start: {new Date(phase.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(phase.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-4">
            {project.tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <CardDescription>Phase: {task.phase}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>{task.priority}</Badge>
                      <Badge variant={task.status === "Completed" ? "default" : "outline"}>{task.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7 xl:grid-cols-7">
            {project.materials.map((material, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                    <Badge variant="outline">
                      {material.used} / {material.required} {material.unit}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Usage</span>
                      <span>{Math.round((material.used / material.required) * 100)}%</span>
                    </div>
                    <Progress value={(material.used / material.required) * 100} />
                    <div className="text-sm text-muted-foreground">
                      {material.required - material.used} {material.unit} remaining
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contractors" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7 xl:grid-cols-7">
            {project.contractors.map((contractor, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{contractor.name}</CardTitle>
                      <CardDescription>{contractor.role}</CardDescription>
                    </div>
                    <Badge variant="default">{contractor.performance}% Performance</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Performance Score</span>
                      <span>{contractor.performance}%</span>
                    </div>
                    <Progress value={contractor.performance} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
