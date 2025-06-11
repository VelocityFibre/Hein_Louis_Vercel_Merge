import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, Calendar, User } from "lucide-react"

const issues = [
  {
    id: 1,
    title: "Fiber cable damaged during construction",
    project: "Westside Fiber Deployment",
    reportedBy: "John Doe",
    reportedDate: "2024-01-19",
    severity: "High",
    status: "Open",
    description: "Construction crew accidentally cut fiber cable during excavation work",
  },
  {
    id: 2,
    title: "Equipment delivery delayed",
    project: "Downtown Network Expansion",
    reportedBy: "Sarah Johnson",
    reportedDate: "2024-01-18",
    severity: "Medium",
    status: "In Progress",
    description: "Fiber optic equipment shipment delayed by 2 weeks due to supplier issues",
  },
  {
    id: 3,
    title: "Permit approval pending",
    project: "Rural Connectivity Phase 2",
    reportedBy: "Mike Wilson",
    reportedDate: "2024-01-17",
    severity: "Low",
    status: "Open",
    description: "City permit office requires additional documentation for pole installations",
  },
]

export default function IssuesPage() {
  return (
    <div className="container flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Issues</h1>
          <p className="text-muted-foreground">Track and resolve project issues and blockers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <Card key={issue.id} className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    {issue.title}
                  </CardTitle>
                  <CardDescription>{issue.project}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant={
                      issue.severity === "High" ? "destructive" : issue.severity === "Medium" ? "default" : "secondary"
                    }
                  >
                    {issue.severity}
                  </Badge>
                  <Badge variant={issue.status === "Open" ? "outline" : "default"}>{issue.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{issue.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Reported by {issue.reportedBy}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(issue.reportedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
