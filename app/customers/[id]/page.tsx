import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  User,
  Globe,
  CreditCard,
  History,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const customerData = {
  1: {
    id: 1,
    name: "City of Westside",
    type: "Government",
    status: "Active",
    primaryContact: {
      name: "Jane Smith",
      title: "IT Director",
      email: "jane.smith@westside.gov",
      phone: "+1 (555) 123-4567",
      mobile: "+1 (555) 123-4568",
    },
    secondaryContact: {
      name: "Michael Brown",
      title: "Project Coordinator",
      email: "m.brown@westside.gov",
      phone: "+1 (555) 123-4569",
    },
    address: {
      street: "123 Main St",
      city: "Westside",
      state: "CA",
      zip: "90210",
      country: "USA",
    },
    website: "https://www.westside.gov",
    taxId: "12-3456789",
    establishedDate: "1995-03-15",
    description:
      "The City of Westside is a progressive municipality committed to providing cutting-edge infrastructure and services to its residents. They are investing heavily in fiber optic networks to support smart city initiatives and provide high-speed internet access to all citizens.",
    projects: [
      {
        id: 1,
        name: "Westside Fiber Deployment",
        status: "In Progress",
        phase: "Implementation",
        progress: 65,
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        budget: 2500000,
        spent: 1625000,
      },
      {
        id: 5,
        name: "Municipal Building Network Upgrade",
        status: "In Progress",
        phase: "Planning",
        progress: 30,
        startDate: "2024-03-01",
        endDate: "2024-08-15",
        budget: 800000,
        spent: 120000,
      },
      {
        id: 6,
        name: "Public WiFi Infrastructure",
        status: "Completed",
        phase: "Deployment",
        progress: 100,
        startDate: "2023-06-01",
        endDate: "2023-12-15",
        budget: 1200000,
        spent: 1180000,
      },
      {
        id: 7,
        name: "Emergency Services Network",
        status: "Completed",
        phase: "Deployment",
        progress: 100,
        startDate: "2023-01-10",
        endDate: "2023-05-30",
        budget: 900000,
        spent: 875000,
      },
      {
        id: 8,
        name: "School District Connectivity",
        status: "Completed",
        phase: "Deployment",
        progress: 100,
        startDate: "2022-08-01",
        endDate: "2023-01-15",
        budget: 1500000,
        spent: 1485000,
      },
    ],
    invoices: [
      {
        id: "INV-2024-001",
        date: "2024-01-15",
        amount: 500000,
        status: "Paid",
        project: "Westside Fiber Deployment",
        dueDate: "2024-02-15",
      },
      {
        id: "INV-2024-002",
        date: "2024-01-30",
        amount: 750000,
        status: "Paid",
        project: "Westside Fiber Deployment",
        dueDate: "2024-03-01",
      },
      {
        id: "INV-2024-003",
        date: "2024-02-15",
        amount: 375000,
        status: "Pending",
        project: "Westside Fiber Deployment",
        dueDate: "2024-03-15",
      },
    ],
    notes: [
      {
        id: 1,
        date: "2024-01-20",
        author: "John Doe",
        content: "Customer requested expedited timeline for Phase 2 implementation. Discussed resource allocation.",
      },
      {
        id: 2,
        date: "2024-01-15",
        author: "Sarah Johnson",
        content: "Initial project kickoff meeting completed. All stakeholders aligned on project scope and timeline.",
      },
      {
        id: 3,
        date: "2024-01-10",
        author: "Mike Wilson",
        content: "Contract signed for Westside Fiber Deployment project. Payment terms: Net 30.",
      },
    ],
    totalRevenue: 6940000,
    outstandingAmount: 375000,
    averageProjectValue: 1388000,
    customerSince: "2022-08-01",
  },
  2: {
    id: 2,
    name: "Metro Communications",
    type: "Enterprise",
    status: "Active",
    primaryContact: {
      name: "Robert Johnson",
      title: "CTO",
      email: "r.johnson@metrocomm.com",
      phone: "+1 (555) 234-5678",
      mobile: "+1 (555) 234-5679",
    },
    address: {
      street: "456 Business Ave",
      city: "Downtown",
      state: "CA",
      zip: "90211",
      country: "USA",
    },
    website: "https://www.metrocomm.com",
    taxId: "98-7654321",
    establishedDate: "2010-07-22",
    description:
      "Metro Communications is a leading telecommunications provider serving the greater metropolitan area. They specialize in enterprise-grade network solutions and are expanding their fiber infrastructure to meet growing demand.",
    projects: [
      {
        id: 2,
        name: "Downtown Network Expansion",
        status: "In Progress",
        phase: "Testing",
        progress: 80,
        startDate: "2024-02-01",
        endDate: "2024-07-15",
        budget: 1800000,
        spent: 1440000,
      },
      {
        id: 9,
        name: "Enterprise Data Center Connection",
        status: "Completed",
        phase: "Deployment",
        progress: 100,
        startDate: "2023-09-01",
        endDate: "2024-01-30",
        budget: 2200000,
        spent: 2180000,
      },
      {
        id: 10,
        name: "Backup Network Infrastructure",
        status: "Completed",
        phase: "Deployment",
        progress: 100,
        startDate: "2023-03-15",
        endDate: "2023-08-30",
        budget: 1600000,
        spent: 1575000,
      },
    ],
    invoices: [
      {
        id: "INV-2024-004",
        date: "2024-02-01",
        amount: 600000,
        status: "Paid",
        project: "Downtown Network Expansion",
        dueDate: "2024-03-01",
      },
      {
        id: "INV-2024-005",
        date: "2024-02-15",
        amount: 840000,
        status: "Paid",
        project: "Downtown Network Expansion",
        dueDate: "2024-03-15",
      },
    ],
    notes: [
      {
        id: 4,
        date: "2024-02-10",
        author: "Sarah Johnson",
        content: "Customer satisfied with current progress. Discussed potential future expansion projects.",
      },
    ],
    totalRevenue: 5600000,
    outstandingAmount: 0,
    averageProjectValue: 1866667,
    customerSince: "2023-03-15",
  },
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = customerData[Number.parseInt(params.id) as keyof typeof customerData]

  if (!customer) {
    return <div>Customer not found</div>
  }

  const activeProjects = customer.projects.filter((project) => project.status === "In Progress")
  const completedProjects = customer.projects.filter((project) => project.status === "Completed")
  const pendingInvoices = customer.invoices.filter((invoice) => invoice.status === "Pending")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/customers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
          <p className="text-muted-foreground mt-2">{customer.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{customer.type}</Badge>
          <Badge variant="default">{customer.status}</Badge>
          <Link href={`/customers/${customer.id}/edit`}>
            <Button>Edit Customer</Button>
          </Link>
        </div>
      </div>

      {/* Customer Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(customer.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">{completedProjects.length} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(customer.outstandingAmount / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">{pendingInvoices.length} pending invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(
                (new Date().getTime() - new Date(customer.customerSince).getTime()) / (1000 * 60 * 60 * 24 * 365),
              )}
              y
            </div>
            <p className="text-xs text-muted-foreground">
              Since {new Date(customer.customerSince).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Primary Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {customer.primaryContact.name} - {customer.primaryContact.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.primaryContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.primaryContact.phone}</span>
                    </div>
                    {customer.primaryContact.mobile && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.primaryContact.mobile} (Mobile)</span>
                      </div>
                    )}
                  </div>
                </div>
                {customer.secondaryContact && (
                  <div>
                    <h4 className="font-medium mb-2">Secondary Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {customer.secondaryContact.name} - {customer.secondaryContact.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.secondaryContact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.secondaryContact.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.type} Organization</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {customer.address.street}, {customer.address.city}, {customer.address.state} {customer.address.zip}
                  </span>
                </div>
                {customer.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={customer.website} className="text-primary hover:underline">
                      {customer.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Tax ID: {customer.taxId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Established: {new Date(customer.establishedDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="space-y-4">
            {customer.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>Phase: {project.phase}</CardDescription>
                    </div>
                    <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>Start: {new Date(project.startDate).toLocaleDateString()}</div>
                      <div>End: {new Date(project.endDate).toLocaleDateString()}</div>
                      <div>Budget: ${(project.budget / 1000000).toFixed(1)}M</div>
                      <div>Spent: ${(project.spent / 1000000).toFixed(1)}M</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="space-y-4">
            {customer.invoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{invoice.id}</CardTitle>
                      <CardDescription>{invoice.project}</CardDescription>
                    </div>
                    <Badge variant={invoice.status === "Paid" ? "default" : "destructive"}>{invoice.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>Amount: ${invoice.amount.toLocaleString()}</div>
                    <div>Date: {new Date(invoice.date).toLocaleDateString()}</div>
                    <div>Due: {new Date(invoice.dueDate).toLocaleDateString()}</div>
                    <div>Status: {invoice.status}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="space-y-4">
            {customer.notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(note.date).toLocaleDateString()} by {note.author}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
