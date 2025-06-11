import { ProjectsOverview } from "@/components/dashboard/projects-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TasksOverview } from "@/components/dashboard/tasks-overview"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectsOverview />
        <TasksOverview />
        <RecentActivity />
      </div>
    </div>
  )
}