const activities = [
  {
    user: {
      name: "John Doe",
      avatar: "JD",
    },
    action: "completed task",
    target: "Finalize design documents",
    project: "Downtown Network Expansion",
    time: "10 minutes ago",
  },
  {
    user: {
      name: "Sarah Johnson",
      avatar: "SJ",
    },
    action: "created task",
    target: "Schedule contractor meeting",
    project: "Rural Connectivity Phase 2",
    time: "1 hour ago",
  },
  {
    user: {
      name: "Mike Wilson",
      avatar: "MW",
    },
    action: "updated",
    target: "BOQ for fiber materials",
    project: "Westside Fiber Deployment",
    time: "2 hours ago",
  },
  {
    user: {
      name: "Emily Chen",
      avatar: "EC",
    },
    action: "approved",
    target: "pole permission request",
    project: "Industrial Park Installation",
    time: "3 hours ago",
  },
  {
    user: {
      name: "Robert Taylor",
      avatar: "RT",
    },
    action: "commented on",
    target: "implementation timeline",
  },
]
export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
            {activity.user.avatar}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.project} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
