"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  CalendarIcon,
  Building,
  DollarSign,
  Users,
  Package,
  Plus,
  X,
  Save,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Truck,
  Wrench,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ProjectFormData = {
  // Basic Information
  name: string
  description: string
  customerId: string
  customerContact: {
    name: string
    email: string
    phone: string
    department: string
  }
  location: {
    address: string
    city: string
    state: string
    zipCode: string
    coordinates: string
  }
  projectType: string
  priority: "Low" | "Medium" | "High" | "Critical"
  projectCode: string

  // Timeline
  startDate: Date | undefined
  endDate: Date | undefined
  estimatedDuration: string
  workingHours: {
    startTime: string
    endTime: string
    workDays: string[]
    allowWeekends: boolean
    allowNightWork: boolean
  }

  // Budget
  totalBudget: string
  currency: string
  budgetBreakdown: {
    materials: string
    labor: string
    equipment: string
    overhead: string
    permits: string
    contingency: string
  }
  paymentTerms: string
  billingSchedule: string

  // Team
  projectManager: string
  teamMembers: string[]
  contractors: string[]
  requiredSkills: string[]
  teamSize: string

  // Technical Details
  networkSpecs: {
    fiberType: string
    cableLength: string
    connectionPoints: string
    distributionHubs: string
    bandwidth: string
    redundancy: boolean
    futureExpansion: boolean
  }
  infrastructure: {
    undergroundWork: boolean
    aerialWork: boolean
    indoorWork: boolean
    datacenterWork: boolean
    existingInfrastructure: string
  }

  // Materials & Equipment
  materials: {
    id: string
    category: string
    name: string
    quantity: string
    unit: string
    estimatedCost: string
    supplier: string
    leadTime: string
    critical: boolean
  }[]

  // Phases & Milestones
  phases: {
    id: string
    name: string
    description: string
    estimatedDuration: string
    dependencies: string[]
    deliverables: string[]
    milestones: string[]
  }[]

  // Risk & Compliance
  riskAssessment: {
    weatherRisk: string
    trafficImpact: string
    environmentalConcerns: string
    permitRequirements: string[]
    safetyRequirements: string[]
  }
  compliance: {
    regulations: string[]
    certifications: string[]
    inspections: string[]
  }

  // Additional Information
  specialRequirements: string
  accessRequirements: string
  communicationPlan: string
  qualityStandards: string
}

const customers = [
  {
    id: "1",
    name: "City of Westside",
    type: "Government",
    contacts: [
      { name: "John Smith", email: "j.smith@westside.gov", phone: "(555) 123-4567", department: "IT Infrastructure" },
      { name: "Mary Johnson", email: "m.johnson@westside.gov", phone: "(555) 123-4568", department: "Public Works" },
    ],
  },
  {
    id: "2",
    name: "Metro Communications",
    type: "Enterprise",
    contacts: [
      {
        name: "David Wilson",
        email: "d.wilson@metrocomm.com",
        phone: "(555) 234-5678",
        department: "Network Operations",
      },
      {
        name: "Sarah Davis",
        email: "s.davis@metrocomm.com",
        phone: "(555) 234-5679",
        department: "Project Management",
      },
    ],
  },
  {
    id: "3",
    name: "Rural Connect Inc",
    type: "ISP",
    contacts: [
      { name: "Michael Brown", email: "m.brown@ruralconnect.com", phone: "(555) 345-6789", department: "Engineering" },
      {
        name: "Lisa Anderson",
        email: "l.anderson@ruralconnect.com",
        phone: "(555) 345-6790",
        department: "Operations",
      },
    ],
  },
  {
    id: "4",
    name: "Industrial Solutions",
    type: "Enterprise",
    contacts: [
      { name: "Robert Taylor", email: "r.taylor@industrialsol.com", phone: "(555) 456-7890", department: "Facilities" },
      { name: "Jennifer White", email: "j.white@industrialsol.com", phone: "(555) 456-7891", department: "IT" },
    ],
  },
]

const projectManagers = [
  { id: "1", name: "John Doe", email: "john.doe@company.com", certifications: ["PMP", "Fiber Optic Certified"] },
  { id: "2", name: "Sarah Johnson", email: "sarah.johnson@company.com", certifications: ["PMP", "Network+"] },
  { id: "3", name: "Mike Wilson", email: "mike.wilson@company.com", certifications: ["PRINCE2", "Fiber Specialist"] },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@company.com",
    certifications: ["Agile Certified", "Telecom Engineer"],
  },
]

const teamMembers = [
  { id: "1", name: "John Doe", role: "Project Manager", skills: ["Project Management", "Risk Assessment"] },
  { id: "2", name: "Sarah Johnson", role: "Network Engineer", skills: ["Network Design", "Fiber Optics", "Testing"] },
  { id: "3", name: "Mike Wilson", role: "Field Technician", skills: ["Cable Installation", "Splicing", "Testing"] },
  { id: "4", name: "Emily Chen", role: "Design Engineer", skills: ["CAD Design", "Network Planning", "Documentation"] },
  { id: "5", name: "Robert Taylor", role: "Quality Assurance", skills: ["Testing", "Documentation", "Compliance"] },
  { id: "6", name: "Lisa Anderson", role: "Site Supervisor", skills: ["Team Leadership", "Safety", "Coordination"] },
  {
    id: "7",
    name: "David Brown",
    role: "Fiber Splicer",
    skills: ["Fusion Splicing", "OTDR Testing", "Troubleshooting"],
  },
  {
    id: "8",
    name: "Jennifer White",
    role: "Safety Officer",
    skills: ["Safety Compliance", "Risk Management", "Training"],
  },
]

const contractors = [
  {
    id: "1",
    name: "FiberTech Solutions",
    specialty: "Installation",
    services: ["Underground Installation", "Aerial Installation", "Splicing"],
    rating: 4.8,
    certifications: ["OSHA Certified", "Fiber Optic Certified"],
  },
  {
    id: "2",
    name: "Network Specialists Inc",
    specialty: "Testing",
    services: ["Network Testing", "Commissioning", "Documentation"],
    rating: 4.9,
    certifications: ["BICSI Certified", "Fluke Networks Certified"],
  },
  {
    id: "3",
    name: "Cable Masters",
    specialty: "Maintenance",
    services: ["Preventive Maintenance", "Emergency Repairs", "Upgrades"],
    rating: 4.7,
    certifications: ["NECA Certified", "Safety Trained"],
  },
  {
    id: "4",
    name: "Metro Fiber Corp",
    specialty: "Installation",
    services: ["Trenching", "Conduit Installation", "Restoration"],
    rating: 4.6,
    certifications: ["Underground Utility Certified", "Traffic Control Certified"],
  },
]

const materialCategories = [
  {
    name: "Fiber Optic Cables",
    items: [
      { name: "Single Mode Fiber Cable (OS2) - 12 Strand", unit: "meters", avgCost: "2.50" },
      { name: "Single Mode Fiber Cable (OS2) - 24 Strand", unit: "meters", avgCost: "4.20" },
      { name: "Single Mode Fiber Cable (OS2) - 48 Strand", unit: "meters", avgCost: "7.80" },
      { name: "Multimode Fiber Cable (OM4) - 12 Strand", unit: "meters", avgCost: "3.20" },
      { name: "Multimode Fiber Cable (OM4) - 24 Strand", unit: "meters", avgCost: "5.40" },
      { name: "Armored Fiber Cable - 12 Strand", unit: "meters", avgCost: "4.80" },
    ],
  },
  {
    name: "Connectivity Hardware",
    items: [
      { name: "Fiber Distribution Hub (12-port)", unit: "units", avgCost: "450.00" },
      { name: "Fiber Distribution Hub (24-port)", unit: "units", avgCost: "680.00" },
      { name: "Fiber Splice Enclosure (12-tray)", unit: "units", avgCost: "320.00" },
      { name: "Fiber Splice Enclosure (24-tray)", unit: "units", avgCost: "480.00" },
      { name: "SC/UPC Connectors", unit: "units", avgCost: "8.50" },
      { name: "LC/UPC Connectors", unit: "units", avgCost: "12.00" },
      { name: "Fiber Patch Panels (24-port)", unit: "units", avgCost: "280.00" },
    ],
  },
  {
    name: "Installation Materials",
    items: [
      { name: "Underground Conduit (4-inch HDPE)", unit: "meters", avgCost: "12.50" },
      { name: "Underground Conduit (6-inch HDPE)", unit: "meters", avgCost: "18.00" },
      { name: "Handholes (24x36 inch)", unit: "units", avgCost: "850.00" },
      { name: "Manholes (Standard)", unit: "units", avgCost: "2400.00" },
      { name: "Warning Tape", unit: "rolls", avgCost: "25.00" },
      { name: "Backfill Sand", unit: "cubic yards", avgCost: "35.00" },
    ],
  },
  {
    name: "Network Equipment",
    items: [
      { name: "Ethernet Switch (24-port Gigabit)", unit: "units", avgCost: "450.00" },
      { name: "Ethernet Switch (48-port Gigabit)", unit: "units", avgCost: "780.00" },
      { name: "Media Converter (Fiber to Ethernet)", unit: "units", avgCost: "120.00" },
      { name: "Optical Network Terminal (ONT)", unit: "units", avgCost: "85.00" },
      { name: "Fiber Optic Transceiver (SFP+)", unit: "units", avgCost: "180.00" },
    ],
  },
  {
    name: "Testing Equipment",
    items: [
      { name: "OTDR (Optical Time Domain Reflectometer)", unit: "units", avgCost: "8500.00" },
      { name: "Fusion Splicer", unit: "units", avgCost: "12000.00" },
      { name: "Power Meter", unit: "units", avgCost: "850.00" },
      { name: "Light Source", unit: "units", avgCost: "650.00" },
      { name: "Visual Fault Locator", unit: "units", avgCost: "180.00" },
    ],
  },
]

const suppliers = [
  { id: "1", name: "Corning Inc", rating: 4.9, leadTime: "2-3 weeks" },
  { id: "2", name: "CommScope", rating: 4.8, leadTime: "1-2 weeks" },
  { id: "3", name: "Prysmian Group", rating: 4.7, leadTime: "3-4 weeks" },
  { id: "4", name: "Fujikura", rating: 4.8, leadTime: "2-3 weeks" },
  { id: "5", name: "AFL Telecommunications", rating: 4.6, leadTime: "1-2 weeks" },
]

const defaultPhases = [
  {
    id: "1",
    name: "Project Initiation",
    description: "Project kickoff, stakeholder alignment, and initial planning",
    estimatedDuration: "1 week",
    dependencies: [],
    deliverables: ["Project Charter", "Stakeholder Register", "Initial Risk Assessment"],
    milestones: ["Project Approval", "Team Assignment"],
  },
  {
    id: "2",
    name: "Site Survey & Design",
    description: "Detailed site survey, network design, and engineering documentation",
    estimatedDuration: "2-3 weeks",
    dependencies: ["1"],
    deliverables: ["Site Survey Report", "Network Design", "Engineering Drawings", "Permit Applications"],
    milestones: ["Design Approval", "Permits Submitted"],
  },
  {
    id: "3",
    name: "Procurement & Permits",
    description: "Material procurement, permit acquisition, and resource preparation",
    estimatedDuration: "3-4 weeks",
    dependencies: ["2"],
    deliverables: ["Materials Delivered", "Permits Approved", "Contractor Agreements"],
    milestones: ["All Materials On-Site", "All Permits Approved"],
  },
  {
    id: "4",
    name: "Installation",
    description: "Physical installation of fiber infrastructure and equipment",
    estimatedDuration: "6-8 weeks",
    dependencies: ["3"],
    deliverables: ["Fiber Cables Installed", "Equipment Mounted", "Connections Made"],
    milestones: ["50% Installation Complete", "Installation Complete"],
  },
  {
    id: "5",
    name: "Testing & Commissioning",
    description: "System testing, performance validation, and commissioning",
    estimatedDuration: "1-2 weeks",
    dependencies: ["4"],
    deliverables: ["Test Results", "Performance Reports", "System Documentation"],
    milestones: ["Testing Complete", "System Commissioned"],
  },
  {
    id: "6",
    name: "Deployment & Handover",
    description: "Go-live activities, training, and project handover",
    estimatedDuration: "1 week",
    dependencies: ["5"],
    deliverables: ["Training Materials", "Operation Manuals", "Handover Documentation"],
    milestones: ["System Live", "Project Closed"],
  },
]

const requiredSkills = [
  "Fiber Optic Installation",
  "Fusion Splicing",
  "OTDR Testing",
  "Network Design",
  "Project Management",
  "Safety Compliance",
  "Underground Construction",
  "Aerial Installation",
  "Traffic Control",
  "Permit Management",
  "Quality Assurance",
  "Documentation",
  "Customer Relations",
  "Risk Management",
  "Equipment Operation",
]

const regulations = [
  "FCC Part 68 - Connection of Terminal Equipment",
  "OSHA 1926 - Construction Safety Standards",
  "NESC - National Electrical Safety Code",
  "Local Building Codes",
  "Environmental Protection Regulations",
  "Traffic Control Regulations",
  "Utility Coordination Requirements",
  "Right-of-Way Regulations",
]

const certifications = [
  "BICSI Certification",
  "Fiber Optic Technician Certification",
  "OSHA 10/30 Hour Training",
  "Traffic Control Certification",
  "Underground Utility Locating",
  "Confined Space Entry",
  "First Aid/CPR Certification",
  "Equipment Operation Licenses",
]

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTab, setCurrentTab] = useState("basic")
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    customerId: "",
    customerContact: {
      name: "",
      email: "",
      phone: "",
      department: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      coordinates: "",
    },
    projectType: "",
    priority: "Medium",
    projectCode: "",
    startDate: undefined,
    endDate: undefined,
    estimatedDuration: "",
    workingHours: {
      startTime: "08:00",
      endTime: "17:00",
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      allowWeekends: false,
      allowNightWork: false,
    },
    totalBudget: "",
    currency: "USD",
    budgetBreakdown: {
      materials: "",
      labor: "",
      equipment: "",
      overhead: "",
      permits: "",
      contingency: "",
    },
    paymentTerms: "",
    billingSchedule: "",
    projectManager: "",
    teamMembers: [],
    contractors: [],
    requiredSkills: [],
    teamSize: "",
    networkSpecs: {
      fiberType: "",
      cableLength: "",
      connectionPoints: "",
      distributionHubs: "",
      bandwidth: "",
      redundancy: false,
      futureExpansion: false,
    },
    infrastructure: {
      undergroundWork: false,
      aerialWork: false,
      indoorWork: false,
      datacenterWork: false,
      existingInfrastructure: "",
    },
    materials: [],
    phases: defaultPhases,
    riskAssessment: {
      weatherRisk: "",
      trafficImpact: "",
      environmentalConcerns: "",
      permitRequirements: [],
      safetyRequirements: [],
    },
    compliance: {
      regulations: [],
      certifications: [],
      inspections: [],
    },
    specialRequirements: "",
    accessRequirements: "",
    communicationPlan: "",
    qualityStandards: "",
  })

  const generateProjectCode = () => {
    const prefix = formData.projectType.split("-")[0].toUpperCase().substring(0, 3)
    const year = new Date().getFullYear().toString().substring(2)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${prefix}${year}${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.customerId || !formData.projectManager) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Project Name, Customer, Project Manager)",
          variant: "destructive",
        })
        return
      }

      if (!formData.projectCode) {
        setFormData((prev) => ({ ...prev, projectCode: generateProjectCode() }))
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Project Created Successfully",
        description: `${formData.name} (${formData.projectCode || generateProjectCode()}) has been created and is ready for execution.`,
      })

      router.push("/projects")
    } catch (error) {
      toast({
        title: "Error Creating Project",
        description: "Failed to create project. Please check all fields and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        {
          id: Date.now().toString(),
          category: "",
          name: "",
          quantity: "",
          unit: "",
          estimatedCost: "",
          supplier: "",
          leadTime: "",
          critical: false,
        },
      ],
    }))
  }

  const removeMaterial = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((m) => m.id !== id),
    }))
  }

  const updateMaterial = (id: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }))
  }

  const addTeamMember = (memberId: string) => {
    if (!formData.teamMembers.includes(memberId)) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, memberId],
      }))
    }
  }

  const removeTeamMember = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((id) => id !== memberId),
    }))
  }

  const addContractor = (contractorId: string) => {
    if (!formData.contractors.includes(contractorId)) {
      setFormData((prev) => ({
        ...prev,
        contractors: [...prev.contractors, contractorId],
      }))
    }
  }

  const removeContractor = (contractorId: string) => {
    setFormData((prev) => ({
      ...prev,
      contractors: prev.contractors.filter((id) => id !== contractorId),
    }))
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter((s) => s !== skill)
        : [...prev.requiredSkills, skill],
    }))
  }

  const toggleRegulation = (regulation: string) => {
    setFormData((prev) => ({
      ...prev,
      compliance: {
        ...prev.compliance,
        regulations: prev.compliance.regulations.includes(regulation)
          ? prev.compliance.regulations.filter((r) => r !== regulation)
          : [...prev.compliance.regulations, regulation],
      },
    }))
  }

  const toggleCertification = (certification: string) => {
    setFormData((prev) => ({
      ...prev,
      compliance: {
        ...prev.compliance,
        certifications: prev.compliance.certifications.includes(certification)
          ? prev.compliance.certifications.filter((c) => c !== certification)
          : [...prev.compliance.certifications, certification],
      },
    }))
  }

  const selectedCustomer = customers.find((c) => c.id === formData.customerId)

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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
          <p className="text-muted-foreground">
            Set up a comprehensive fiber deployment project with all necessary details
          </p>
        </div>
        {formData.projectCode && (
          <Badge variant="outline" className="text-lg px-3 py-1">
            {formData.projectCode}
          </Badge>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Project Information
                  </CardTitle>
                  <CardDescription>Basic details about the project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter descriptive project name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed description of project scope, objectives, and expected outcomes"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-deployment">New Fiber Deployment</SelectItem>
                          <SelectItem value="network-expansion">Network Expansion</SelectItem>
                          <SelectItem value="infrastructure-upgrade">Infrastructure Upgrade</SelectItem>
                          <SelectItem value="maintenance-project">Maintenance Project</SelectItem>
                          <SelectItem value="emergency-repair">Emergency Repair</SelectItem>
                          <SelectItem value="system-integration">System Integration</SelectItem>
                          <SelectItem value="capacity-upgrade">Capacity Upgrade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) => setFormData((prev) => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              Low Priority
                            </div>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                              Medium Priority
                            </div>
                          </SelectItem>
                          <SelectItem value="High">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              High Priority
                            </div>
                          </SelectItem>
                          <SelectItem value="Critical">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              Critical Priority
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectCode">Project Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="projectCode"
                        value={formData.projectCode}
                        onChange={(e) => setFormData((prev) => ({ ...prev, projectCode: e.target.value }))}
                        placeholder="Auto-generated or custom code"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormData((prev) => ({ ...prev, projectCode: generateProjectCode() }))}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Customer & Location
                  </CardTitle>
                  <CardDescription>Customer information and project location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer *</Label>
                    <Select
                      value={formData.customerId}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, customerId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer organization" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{customer.name}</span>
                              <span className="text-sm text-muted-foreground">{customer.type}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCustomer && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerContact">Primary Contact</Label>
                        <Select
                          value={formData.customerContact.name}
                          onValueChange={(value) => {
                            const contact = selectedCustomer.contacts.find((c) => c.name === value)
                            if (contact) {
                              setFormData((prev) => ({ ...prev, customerContact: contact }))
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary contact" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCustomer.contacts.map((contact) => (
                              <SelectItem key={contact.name} value={contact.name}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{contact.name}</span>
                                  <span className="text-sm text-muted-foreground">{contact.department}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.customerContact.name && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            {formData.customerContact.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4" />
                            {formData.customerContact.phone}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Project Location</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={formData.location.address}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: { ...prev.location, address: e.target.value },
                            }))
                          }
                          placeholder="Street address or area description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={formData.location.city}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                location: { ...prev.location, city: e.target.value },
                              }))
                            }
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={formData.location.state}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                location: { ...prev.location, state: e.target.value },
                              }))
                            }
                            placeholder="State"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coordinates">GPS Coordinates (Optional)</Label>
                        <Input
                          id="coordinates"
                          value={formData.location.coordinates}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: { ...prev.location, coordinates: e.target.value },
                            }))
                          }
                          placeholder="Latitude, Longitude"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Project Schedule
                  </CardTitle>
                  <CardDescription>Set project dates and working hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.startDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Target End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.endDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                    <Input
                      id="estimatedDuration"
                      value={formData.estimatedDuration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, estimatedDuration: e.target.value }))}
                      placeholder="e.g., 16 weeks, 4 months"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Working Hours</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={formData.workingHours.startTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              workingHours: { ...prev.workingHours, startTime: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.workingHours.endTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              workingHours: { ...prev.workingHours, endTime: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowWeekends"
                          checked={formData.workingHours.allowWeekends}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              workingHours: { ...prev.workingHours, allowWeekends: checked },
                            }))
                          }
                        />
                        <Label htmlFor="allowWeekends">Allow weekend work</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowNightWork"
                          checked={formData.workingHours.allowNightWork}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              workingHours: { ...prev.workingHours, allowNightWork: checked },
                            }))
                          }
                        />
                        <Label htmlFor="allowNightWork">Allow night work (after hours)</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Project Phases
                  </CardTitle>
                  <CardDescription>Planned project phases and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formData.phases.map((phase, index) => (
                      <div key={phase.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                              {index + 1}
                            </div>
                            <div className="font-medium">{phase.name}</div>
                          </div>
                          <Badge variant="outline">{phase.estimatedDuration}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground ml-8">{phase.description}</div>
                        <div className="ml-8 space-y-1">
                          <div className="text-xs font-medium">Key Deliverables:</div>
                          <div className="text-xs text-muted-foreground">{phase.deliverables.join(", ")}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget Overview
                  </CardTitle>
                  <CardDescription>Total budget and cost breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalBudget">Total Project Budget</Label>
                      <Input
                        id="totalBudget"
                        type="number"
                        value={formData.totalBudget}
                        onChange={(e) => setFormData((prev) => ({ ...prev, totalBudget: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                          <SelectItem value="AUD">AUD (A$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Detailed Cost Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="materials">Materials & Equipment</Label>
                        <Input
                          id="materials"
                          type="number"
                          value={formData.budgetBreakdown.materials}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budgetBreakdown: { ...prev.budgetBreakdown, materials: e.target.value },
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="labor">Labor Costs</Label>
                        <Input
                          id="labor"
                          type="number"
                          value={formData.budgetBreakdown.labor}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budgetBreakdown: { ...prev.budgetBreakdown, labor: e.target.value },
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="equipment">Equipment Rental</Label>
                        <Input
                          id="equipment"
                          type="number"
                          value={formData.budgetBreakdown.equipment}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budgetBreakdown: { ...prev.budgetBreakdown, equipment: e.target.value },
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permits">Permits & Fees</Label>
                        <Input
                          id="permits"
                          type="number"
                          value={formData.budgetBreakdown.permits}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budgetBreakdown: { ...prev.budgetBreakdown, permits: e.target.value },
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="overhead">Overhead & Admin</Label>
                        <Input
                          id="overhead"
                          type="number"
                          value={formData.budgetBreakdown.overhead}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budgetBreakdown: { ...prev.budgetBreakdown, overhead: e.target.value },
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contingency">Contingency (10-15%)</Label>
                        <Input
                          id="contingency"
                          type="number"
                          value={formData.budgetBreakdown.contingency}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budgetBreakdown: { ...prev.budgetBreakdown, contingency: e.target.value },
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Payment & Billing
                  </CardTitle>
                  <CardDescription>Payment terms and billing schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentTerms: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net-30">Net 30 Days</SelectItem>
                        <SelectItem value="net-45">Net 45 Days</SelectItem>
                        <SelectItem value="net-60">Net 60 Days</SelectItem>
                        <SelectItem value="milestone">Milestone-based</SelectItem>
                        <SelectItem value="progress">Progress Payments</SelectItem>
                        <SelectItem value="upfront-50">50% Upfront, 50% on Completion</SelectItem>
                        <SelectItem value="custom">Custom Terms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingSchedule">Billing Schedule</Label>
                    <Select
                      value={formData.billingSchedule}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, billingSchedule: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Billing</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly Billing</SelectItem>
                        <SelectItem value="milestone">Milestone-based Billing</SelectItem>
                        <SelectItem value="phase-completion">Phase Completion</SelectItem>
                        <SelectItem value="percentage">Percentage of Work Complete</SelectItem>
                        <SelectItem value="lump-sum">Lump Sum on Completion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Budget Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Materials:</span>
                        <span>${formData.budgetBreakdown.materials || "0.00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Labor:</span>
                        <span>${formData.budgetBreakdown.labor || "0.00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equipment:</span>
                        <span>${formData.budgetBreakdown.equipment || "0.00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other:</span>
                        <span>
                          $
                          {(
                            Number.parseFloat(formData.budgetBreakdown.permits || "0") +
                            Number.parseFloat(formData.budgetBreakdown.overhead || "0") +
                            Number.parseFloat(formData.budgetBreakdown.contingency || "0")
                          ).toFixed(2)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${formData.totalBudget || "0.00"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Assignment
                  </CardTitle>
                  <CardDescription>Assign project manager and team members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectManager">Project Manager *</Label>
                    <Select
                      value={formData.projectManager}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, projectManager: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectManagers.map((pm) => (
                          <SelectItem key={pm.id} value={pm.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{pm.name}</span>
                              <span className="text-sm text-muted-foreground">{pm.certifications.join(", ")}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Estimated Team Size</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      value={formData.teamSize}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamSize: e.target.value }))}
                      placeholder="Number of team members needed"
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Team Members</h4>
                    <div className="space-y-3">
                      <Select onValueChange={addTeamMember}>
                        <SelectTrigger>
                          <SelectValue placeholder="Add team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers
                            .filter((member) => !formData.teamMembers.includes(member.id))
                            .map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{member.name}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {member.role} • {member.skills.slice(0, 2).join(", ")}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <div className="flex flex-wrap gap-2">
                        {formData.teamMembers.map((memberId) => {
                          const member = teamMembers.find((m) => m.id === memberId)
                          return member ? (
                            <Badge key={memberId} variant="secondary" className="flex items-center gap-1">
                              {member.name} ({member.role})
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => removeTeamMember(memberId)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Contractors & Skills
                  </CardTitle>
                  <CardDescription>External contractors and required skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">External Contractors</h4>
                    <div className="space-y-3">
                      <Select onValueChange={addContractor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Add contractor" />
                        </SelectTrigger>
                        <SelectContent>
                          {contractors
                            .filter((contractor) => !formData.contractors.includes(contractor.id))
                            .map((contractor) => (
                              <SelectItem key={contractor.id} value={contractor.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{contractor.name}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {contractor.specialty} • Rating: {contractor.rating}/5
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <div className="space-y-2">
                        {formData.contractors.map((contractorId) => {
                          const contractor = contractors.find((c) => c.id === contractorId)
                          return contractor ? (
                            <div key={contractorId} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium">{contractor.name}</div>
                                <div className="text-sm text-muted-foreground">{contractor.services.join(", ")}</div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeContractor(contractorId)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Required Skills</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {requiredSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={formData.requiredSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Network Specifications
                  </CardTitle>
                  <CardDescription>Technical network requirements and specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fiberType">Fiber Type</Label>
                      <Select
                        value={formData.networkSpecs.fiberType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            networkSpecs: { ...prev.networkSpecs, fiberType: value },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fiber type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-mode-os2">Single Mode (OS2) - Long Distance</SelectItem>
                          <SelectItem value="multimode-om4">Multimode (OM4) - High Bandwidth</SelectItem>
                          <SelectItem value="multimode-om5">Multimode (OM5) - Wideband</SelectItem>
                          <SelectItem value="hybrid">Hybrid (Single + Multi Mode)</SelectItem>
                          <SelectItem value="armored">Armored Fiber Cable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bandwidth">Required Bandwidth</Label>
                      <Select
                        value={formData.networkSpecs.bandwidth}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            networkSpecs: { ...prev.networkSpecs, bandwidth: value },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bandwidth" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1gbps">1 Gbps</SelectItem>
                          <SelectItem value="10gbps">10 Gbps</SelectItem>
                          <SelectItem value="40gbps">40 Gbps</SelectItem>
                          <SelectItem value="100gbps">100 Gbps</SelectItem>
                          <SelectItem value="custom">Custom Requirements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cableLength">Total Cable Length (meters)</Label>
                      <Input
                        id="cableLength"
                        type="number"
                        value={formData.networkSpecs.cableLength}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            networkSpecs: { ...prev.networkSpecs, cableLength: e.target.value },
                          }))
                        }
                        placeholder="Total fiber cable length"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="connectionPoints">Connection Points</Label>
                      <Input
                        id="connectionPoints"
                        type="number"
                        value={formData.networkSpecs.connectionPoints}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            networkSpecs: { ...prev.networkSpecs, connectionPoints: e.target.value },
                          }))
                        }
                        placeholder="Number of connection points"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="distributionHubs">Distribution Hubs</Label>
                    <Input
                      id="distributionHubs"
                      type="number"
                      value={formData.networkSpecs.distributionHubs}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          networkSpecs: { ...prev.networkSpecs, distributionHubs: e.target.value },
                        }))
                      }
                      placeholder="Number of distribution hubs"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="redundancy"
                        checked={formData.networkSpecs.redundancy}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            networkSpecs: { ...prev.networkSpecs, redundancy: checked },
                          }))
                        }
                      />
                      <Label htmlFor="redundancy">Network Redundancy Required</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="futureExpansion"
                        checked={formData.networkSpecs.futureExpansion}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            networkSpecs: { ...prev.networkSpecs, futureExpansion: checked },
                          }))
                        }
                      />
                      <Label htmlFor="futureExpansion">Plan for Future Expansion</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Infrastructure Requirements
                  </CardTitle>
                  <CardDescription>Installation type and infrastructure details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Installation Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="undergroundWork"
                          checked={formData.infrastructure.undergroundWork}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              infrastructure: { ...prev.infrastructure, undergroundWork: checked },
                            }))
                          }
                        />
                        <Label htmlFor="undergroundWork">Underground Installation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="aerialWork"
                          checked={formData.infrastructure.aerialWork}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              infrastructure: { ...prev.infrastructure, aerialWork: checked },
                            }))
                          }
                        />
                        <Label htmlFor="aerialWork">Aerial Installation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="indoorWork"
                          checked={formData.infrastructure.indoorWork}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              infrastructure: { ...prev.infrastructure, indoorWork: checked },
                            }))
                          }
                        />
                        <Label htmlFor="indoorWork">Indoor Installation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="datacenterWork"
                          checked={formData.infrastructure.datacenterWork}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              infrastructure: { ...prev.infrastructure, datacenterWork: checked },
                            }))
                          }
                        />
                        <Label htmlFor="datacenterWork">Data Center Work</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="existingInfrastructure">Existing Infrastructure</Label>
                    <Textarea
                      id="existingInfrastructure"
                      value={formData.infrastructure.existingInfrastructure}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          infrastructure: { ...prev.infrastructure, existingInfrastructure: e.target.value },
                        }))
                      }
                      placeholder="Describe existing infrastructure that can be utilized or needs to be considered"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accessRequirements">Access Requirements</Label>
                    <Textarea
                      id="accessRequirements"
                      value={formData.accessRequirements}
                      onChange={(e) => setFormData((prev) => ({ ...prev, accessRequirements: e.target.value }))}
                      placeholder="Special access requirements, security clearances, restricted areas, etc."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Technical Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData((prev) => ({ ...prev, specialRequirements: e.target.value }))}
                      placeholder="Any special technical requirements, environmental considerations, or constraints"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Materials & Equipment
                </CardTitle>
                <CardDescription>Define required materials, equipment, and suppliers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Required Materials</h4>
                  <Button type="button" variant="outline" size="sm" onClick={addMaterial}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.materials.map((material) => (
                    <div key={material.id} className="grid grid-cols-1 lg:grid-cols-8 gap-3 p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-xs">Category</Label>
                        <Select
                          value={material.category}
                          onValueChange={(value) => updateMaterial(material.id, "category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {materialCategories.map((category) => (
                              <SelectItem key={category.name} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 lg:col-span-2">
                        <Label className="text-xs">Material</Label>
                        <Select
                          value={material.name}
                          onValueChange={(value) => {
                            updateMaterial(material.id, "name", value)
                            // Auto-fill unit and estimated cost if available
                            const category = materialCategories.find((c) => c.name === material.category)
                            const item = category?.items.find((i) => i.name === value)
                            if (item) {
                              updateMaterial(material.id, "unit", item.unit)
                              updateMaterial(material.id, "estimatedCost", item.avgCost)
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                          <SelectContent>
                            {material.category &&
                              materialCategories
                                .find((c) => c.name === material.category)
                                ?.items.map((item) => (
                                  <SelectItem key={item.name} value={item.name}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          value={material.quantity}
                          onChange={(e) => updateMaterial(material.id, "quantity", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Unit</Label>
                        <Input
                          value={material.unit}
                          onChange={(e) => updateMaterial(material.id, "unit", e.target.value)}
                          placeholder="units"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Cost/Unit</Label>
                        <Input
                          type="number"
                          value={material.estimatedCost}
                          onChange={(e) => updateMaterial(material.id, "estimatedCost", e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Supplier</Label>
                        <Select
                          value={material.supplier}
                          onValueChange={(value) => updateMaterial(material.id, "supplier", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Supplier" />
                          </SelectTrigger>
                          <SelectContent>
                            {suppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.name}>
                                <div className="flex flex-col">
                                  <span>{supplier.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {supplier.leadTime} • {supplier.rating}/5
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`critical-${material.id}`}
                            checked={material.critical}
                            onCheckedChange={(checked) => updateMaterial(material.id, "critical", checked)}
                          />
                          <Label htmlFor={`critical-${material.id}`} className="text-xs">
                            Critical
                          </Label>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMaterial(material.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.materials.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No materials added yet.</p>
                    <p className="text-sm">Click "Add Material" to start building your materials list.</p>
                  </div>
                )}

                {formData.materials.length > 0 && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Materials Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Total Items</div>
                        <div className="font-medium">{formData.materials.length}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Critical Items</div>
                        <div className="font-medium">{formData.materials.filter((m) => m.critical).length}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Estimated Cost</div>
                        <div className="font-medium">
                          $
                          {formData.materials
                            .reduce(
                              (total, m) =>
                                total +
                                Number.parseFloat(m.quantity || "0") * Number.parseFloat(m.estimatedCost || "0"),
                              0,
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Suppliers</div>
                        <div className="font-medium">
                          {new Set(formData.materials.map((m) => m.supplier).filter(Boolean)).size}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>Identify and assess project risks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weatherRisk">Weather & Environmental Risks</Label>
                    <Textarea
                      id="weatherRisk"
                      value={formData.riskAssessment.weatherRisk}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          riskAssessment: { ...prev.riskAssessment, weatherRisk: e.target.value },
                        }))
                      }
                      placeholder="Seasonal weather patterns, environmental concerns, natural disaster risks"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trafficImpact">Traffic & Public Impact</Label>
                    <Textarea
                      id="trafficImpact"
                      value={formData.riskAssessment.trafficImpact}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          riskAssessment: { ...prev.riskAssessment, trafficImpact: e.target.value },
                        }))
                      }
                      placeholder="Traffic disruption, public safety concerns, community impact"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="environmentalConcerns">Environmental Concerns</Label>
                    <Textarea
                      id="environmentalConcerns"
                      value={formData.riskAssessment.environmentalConcerns}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          riskAssessment: { ...prev.riskAssessment, environmentalConcerns: e.target.value },
                        }))
                      }
                      placeholder="Protected areas, wildlife, soil conditions, contamination risks"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="communicationPlan">Communication Plan</Label>
                    <Textarea
                      id="communicationPlan"
                      value={formData.communicationPlan}
                      onChange={(e) => setFormData((prev) => ({ ...prev, communicationPlan: e.target.value }))}
                      placeholder="Stakeholder communication strategy, reporting schedule, escalation procedures"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Compliance & Standards
                  </CardTitle>
                  <CardDescription>Regulatory requirements and quality standards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Required Regulations</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {regulations.map((regulation) => (
                        <div key={regulation} className="flex items-center space-x-2">
                          <Checkbox
                            id={regulation}
                            checked={formData.compliance.regulations.includes(regulation)}
                            onCheckedChange={() => toggleRegulation(regulation)}
                          />
                          <Label htmlFor={regulation} className="text-sm">
                            {regulation}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Required Certifications</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {certifications.map((certification) => (
                        <div key={certification} className="flex items-center space-x-2">
                          <Checkbox
                            id={certification}
                            checked={formData.compliance.certifications.includes(certification)}
                            onCheckedChange={() => toggleCertification(certification)}
                          />
                          <Label htmlFor={certification} className="text-sm">
                            {certification}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="qualityStandards">Quality Standards</Label>
                    <Textarea
                      id="qualityStandards"
                      value={formData.qualityStandards}
                      onChange={(e) => setFormData((prev) => ({ ...prev, qualityStandards: e.target.value }))}
                      placeholder="Quality assurance requirements, testing standards, acceptance criteria"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <div className="flex justify-between items-center pt-6 border-t">
            <div className="flex gap-4">
              <Link href="/projects">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Save as draft functionality
                  toast({
                    title: "Draft Saved",
                    description: "Project draft has been saved successfully.",
                  })
                }}
              >
                Save as Draft
              </Button>
            </div>
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Project...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Project
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  )
}
