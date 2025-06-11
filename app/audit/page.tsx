"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDownToLine,
  Calendar,
  Check,
  ChevronDown,
  Download,
  Eye,
  Filter,
  Key,
  Lock,
  LogIn,
  LogOut,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash,
  User,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedType, setSelectedType] = useState("all")
  const [selectedUser, setSelectedUser] = useState("all")
  const [selectedRisk, setSelectedRisk] = useState("all")

  // Mock audit data
  const auditLogs = [
    {
      id: "log-001",
      timestamp: new Date(2025, 5, 10, 9, 23, 12),
      user: "John Doe",
      userId: "user-001",
      action: "login",
      type: "security",
      entity: "system",
      entityId: null,
      details: "User logged in successfully",
      ipAddress: "192.168.1.105",
      userAgent: "Chrome/115.0.5790.171",
      risk: "low",
      icon: <LogIn className="h-4 w-4" />,
    },
    {
      id: "log-002",
      timestamp: new Date(2025, 5, 10, 9, 45, 30),
      user: "John Doe",
      userId: "user-001",
      action: "create",
      type: "data",
      entity: "project",
      entityId: "proj-123",
      details: "Created new project 'Downtown Network Expansion'",
      ipAddress: "192.168.1.105",
      userAgent: "Chrome/115.0.5790.171",
      risk: "low",
      icon: <Plus className="h-4 w-4" />,
    },
    {
      id: "log-003",
      timestamp: new Date(2025, 5, 10, 10, 12, 45),
      user: "Sarah Johnson",
      userId: "user-002",
      action: "update",
      type: "data",
      entity: "task",
      entityId: "task-456",
      details: "Updated task 'Schedule contractor meeting' status to 'Completed'",
      ipAddress: "192.168.1.110",
      userAgent: "Firefox/98.0.2",
      risk: "low",
      icon: <Pencil className="h-4 w-4" />,
    },
    {
      id: "log-004",
      timestamp: new Date(2025, 5, 10, 11, 5, 22),
      user: "Mike Wilson",
      userId: "user-003",
      action: "update",
      type: "data",
      entity: "material",
      entityId: "mat-789",
      details: "Updated material 'Fiber Cable 24-Core' quantity from 1200m to 1500m",
      ipAddress: "192.168.1.115",
      userAgent: "Chrome/115.0.5790.171",
      risk: "low",
      icon: <Pencil className="h-4 w-4" />,
    },
    {
      id: "log-005",
      timestamp: new Date(2025, 5, 10, 11, 30, 15),
      user: "Admin",
      userId: "admin-001",
      action: "permission_change",
      type: "security",
      entity: "user",
      entityId: "user-004",
      details: "Changed user 'David Smith' role from 'Viewer' to 'Editor'",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/115.0.5790.171",
      risk: "medium",
      icon: <Key className="h-4 w-4" />,
    },
    {
      id: "log-006",
      timestamp: new Date(2025, 5, 10, 12, 15, 30),
      user: "System",
      userId: "system",
      action: "backup",
      type: "system",
      entity: "database",
      entityId: null,
      details: "Automated daily backup completed successfully",
      ipAddress: "internal",
      userAgent: "System",
      risk: "low",
      icon: <Check className="h-4 w-4" />,
    },
    {
      id: "log-007",
      timestamp: new Date(2025, 5, 10, 13, 45, 10),
      user: "John Doe",
      userId: "user-001",
      action: "export",
      type: "data",
      entity: "report",
      entityId: "report-001",
      details: "Exported 'Financial Summary' report to PDF",
      ipAddress: "192.168.1.105",
      userAgent: "Chrome/115.0.5790.171",
      risk: "low",
      icon: <ArrowDownToLine className="h-4 w-4" />,
    },
    {
      id: "log-008",
      timestamp: new Date(2025, 5, 10, 14, 22, 45),
      user: "Unknown",
      userId: null,
      action: "login_failed",
      type: "security",
      entity: "system",
      entityId: null,
      details: "Failed login attempt for user 'admin' (3rd attempt)",
      ipAddress: "203.0.113.42",
      userAgent: "Chrome/115.0.5790.171",
      risk: "high",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      id: "log-009",
      timestamp: new Date(2025, 5, 10, 15, 10, 30),
      user: "Sarah Johnson",
      userId: "user-002",
      action: "delete",
      type: "data",
      entity: "task",
      entityId: "task-789",
      details: "Deleted task 'Review supplier contracts'",
      ipAddress: "192.168.1.110",
      userAgent: "Firefox/98.0.2",
      risk: "medium",
      icon: <Trash className="h-4 w-4" />,
    },
    {
      id: "log-010",
      timestamp: new Date(2025, 5, 10, 16, 5, 15),
      user: "Admin",
      userId: "admin-001",
      action: "reset_password",
      type: "security",
      entity: "user",
      entityId: "user-005",
      details: "Reset password for user 'Emily Chen'",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/115.0.5790.171",
      risk: "medium",
      icon: <Lock className="h-4 w-4" />,
    },
    {
      id: "log-011",
      timestamp: new Date(2025, 5, 10, 16, 30, 45),
      user: "Mike Wilson",
      userId: "user-003",
      action: "view",
      type: "data",
      entity: "customer",
      entityId: "cust-456",
      details: "Viewed sensitive customer data for 'MetroComm Inc.'",
      ipAddress: "192.168.1.115",
      userAgent: "Chrome/115.0.5790.171",
      risk: "low",
      icon: <Eye className="h-4 w-4" />,
    },
    {
      id: "log-012",
      timestamp: new Date(2025, 5, 10, 17, 0, 0),
      user: "John Doe",
      userId: "user-001",
      action: "logout",
      type: "security",
      entity: "system",
      entityId: null,
      details: "User logged out",
      ipAddress: "192.168.1.105",
      userAgent: "Chrome/115.0.5790.171",
      risk: "low",
      icon: <LogOut className="h-4 w-4" />,
    },
  ]

  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter((log) => {
    // Search query filter
    if (
      searchQuery &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.entity.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Date filter
    if (
      selectedDate &&
      !(
        log.timestamp.getDate() === selectedDate.getDate() &&
        log.timestamp.getMonth() === selectedDate.getMonth() &&
        log.timestamp.getFullYear() === selectedDate.getFullYear()
      )
    ) {
      return false
    }

    // Type filter
    if (selectedType !== "all" && log.type !== selectedType) {
      return false
    }

    // User filter
    if (selectedUser !== "all" && log.userId !== selectedUser) {
      return false
    }

    // Risk filter
    if (selectedRisk !== "all" && log.risk !== selectedRisk) {
      return false
    }

    return true
  })

  // Get unique users for filter
  const users = Array.from(new Set(auditLogs.map((log) => log.userId))).filter(Boolean)

  // Risk badge color mapping
  const riskColorMap: Record<string, string> = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    critical: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
            <p className="text-muted-foreground">Track all system activities and changes</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedDate(undefined)
                    setSelectedType("all")
                    setSelectedUser("all")
                    setSelectedRisk("all")
                    setSearchQuery("")
                  }}
                >
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditLogs.length}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditLogs.filter((log) => log.type === "security").length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 font-medium">
                  {auditLogs.filter((log) => log.type === "security" && log.risk === "high").length}
                </span>{" "}
                high risk events
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Data Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditLogs.filter((log) => log.type === "data").length}</div>
              <p className="text-xs text-muted-foreground">Create, update, delete actions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(auditLogs.map((log) => log.userId)).size - 1}</div>
              <p className="text-xs text-muted-foreground">Unique users with activity</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search audit logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px]"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map((userId) => (
                    <SelectItem key={userId} value={userId || ""}>
                      {auditLogs.find((log) => log.userId === userId)?.user || "Unknown"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="data">Data Changes</TabsTrigger>
              <TabsTrigger value="system">System Events</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="border rounded-md mt-2">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Details</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Risk</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <tr
                          key={log.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="font-medium">{format(log.timestamp, "h:mm a")}</span>
                              <span className="text-xs text-muted-foreground">
                                {format(log.timestamp, "MMM d, yyyy")}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium">{log.user}</div>
                                <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                {log.icon}
                              </div>
                              <div>
                                <div className="font-medium capitalize">{log.action.replace("_", " ")}</div>
                                <div className="text-xs text-muted-foreground capitalize">{log.entity}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="max-w-[300px] truncate" title={log.details}>
                              {log.details}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge className={riskColorMap[log.risk] || ""} variant="outline">
                              {log.risk.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Export Entry</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No audit logs found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="security" className="border rounded-md mt-2">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Details</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Risk</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredLogs.filter((log) => log.type === "security").length > 0 ? (
                      filteredLogs
                        .filter((log) => log.type === "security")
                        .map((log) => (
                          <tr
                            key={log.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <span className="font-medium">{format(log.timestamp, "h:mm a")}</span>
                                <span className="text-xs text-muted-foreground">
                                  {format(log.timestamp, "MMM d, yyyy")}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <User className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="font-medium">{log.user}</div>
                                  <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  {log.icon}
                                </div>
                                <div>
                                  <div className="font-medium capitalize">{log.action.replace("_", " ")}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{log.entity}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="max-w-[300px] truncate" title={log.details}>
                                {log.details}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={riskColorMap[log.risk] || ""} variant="outline">
                                {log.risk.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Export Entry</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No security logs found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="data" className="border rounded-md mt-2">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Details</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Risk</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredLogs.filter((log) => log.type === "data").length > 0 ? (
                      filteredLogs
                        .filter((log) => log.type === "data")
                        .map((log) => (
                          <tr
                            key={log.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <span className="font-medium">{format(log.timestamp, "h:mm a")}</span>
                                <span className="text-xs text-muted-foreground">
                                  {format(log.timestamp, "MMM d, yyyy")}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <User className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="font-medium">{log.user}</div>
                                  <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  {log.icon}
                                </div>
                                <div>
                                  <div className="font-medium capitalize">{log.action.replace("_", " ")}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{log.entity}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="max-w-[300px] truncate" title={log.details}>
                                {log.details}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={riskColorMap[log.risk] || ""} variant="outline">
                                {log.risk.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Export Entry</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No data change logs found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="system" className="border rounded-md mt-2">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Details</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Risk</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredLogs.filter((log) => log.type === "system").length > 0 ? (
                      filteredLogs
                        .filter((log) => log.type === "system")
                        .map((log) => (
                          <tr
                            key={log.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <span className="font-medium">{format(log.timestamp, "h:mm a")}</span>
                                <span className="text-xs text-muted-foreground">
                                  {format(log.timestamp, "MMM d, yyyy")}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <User className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="font-medium">{log.user}</div>
                                  <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  {log.icon}
                                </div>
                                <div>
                                  <div className="font-medium capitalize">{log.action.replace("_", " ")}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{log.entity}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="max-w-[300px] truncate" title={log.details}>
                                {log.details}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={riskColorMap[log.risk] || ""} variant="outline">
                                {log.risk.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Export Entry</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No system logs found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredLogs.length}</strong> of <strong>{auditLogs.length}</strong> entries
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="px-4">
                1
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
