"use client"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Projects Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Project statistics will appear here</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Tasks Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Task statistics will appear here</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-400">Recent activity will appear here</p>
        </div>
      </div>
    </div>
  )
}