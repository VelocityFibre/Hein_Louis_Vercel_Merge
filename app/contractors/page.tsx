"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Plus, Search, Filter, Building2, Phone, Mail, MapPin, Star, Briefcase, Award } from "lucide-react"

type Contractor = {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  specialties: string[]
  services: string[]
  certifications: string[]
  rating: number
  totalProjects: number
  activeProjects: number
  completedProjects: number
  status: "Active" | "Inactive" | "Pending" | "Suspended"
  joinDate: string
  lastProject: string
  hourlyRate: string
  availability: "Available" | "Busy" | "Unavailable"
  website?: string
  notes?: string
}

const initialContractors: Contractor[] = [
  {
    id: "1",
    companyName: "FiberTech Solutions",
    contactPerson: "Michael Rodriguez",
    email: "m.rodriguez@fibertech.com",
    phone: "(555) 123-4567",
    address: {
      street: "1234 Tech Drive",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    specialties: ["Underground Installation", "Aerial Installation", "Splicing"],
    services: ["Installation", "Maintenance", "Testing", "Emergency Repair"],
    certifications: ["OSHA Certified", "Fiber Optic Certified", "BICSI Certified"],
    rating: 4.8,
    totalProjects: 45,
    activeProjects: 3,
    completedProjects: 42,
    status: "Active",
    joinDate: "2022-03-15",
    lastProject: "2024-01-10",
    hourlyRate: "$85",
    availability: "Available",
    website: "www.fibertech.com",
    notes: "Excellent track record with large-scale deployments",
  },
  {
    id: "2",
    companyName: "Network Specialists Inc",
    contactPerson: "Sarah Chen",
    email: "s.chen@netspec.com",
    phone: "(555) 234-5678",
    address: {
      street: "5678 Network Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
    },
    specialties: ["Network Testing", "Commissioning", "Documentation"],
    services: ["Testing", "Commissioning", "Documentation", "Training"],
    certifications: ["BICSI Certified", "Fluke Networks Certified", "OTDR Specialist"],
    rating: 4.9,
    totalProjects: 38,
    activeProjects: 2,
    completedProjects: 36,
    status: "Active",
    joinDate: "2021-08-22",
    lastProject: "2024-01-08",
    hourlyRate: "$95",
    availability: "Busy",
    website: "www.netspec.com",
    notes: "Specialists in high-precision testing and validation",
  },
  {
    id: "3",
    companyName: "Cable Masters LLC",
    contactPerson: "David Thompson",
    email: "d.thompson@cablemasters.com",
    phone: "(555) 345-6789",
    address: {
      street: "9012 Cable Street",
      city: "Denver",
      state: "CO",
      zipCode: "80202",
    },
    specialties: ["Preventive Maintenance", "Emergency Repairs", "Upgrades"],
    services: ["Maintenance", "Emergency Repair", "Upgrades", "Troubleshooting"],
    certifications: ["NECA Certified", "Safety Trained", "Equipment Specialist"],
    rating: 4.7,
    totalProjects: 52,
    activeProjects: 4,
    completedProjects: 48,
    status: "Active",
    joinDate: "2020-11-10",
    lastProject: "2024-01-12",
    hourlyRate: "$75",
    availability: "Available",
    notes: "24/7 emergency response capability",
  },
  {
    id: "4",
    companyName: "Metro Fiber Corp",
    contactPerson: "Jennifer Walsh",
    email: "j.walsh@metrofiber.com",
    phone: "(555) 456-7890",
    address: {
      street: "3456 Metro Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
    },
    specialties: ["Trenching", "Conduit Installation", "Restoration"],
    services: ["Trenching", "Conduit Installation", "Site Restoration", "Permits"],
    certifications: ["Underground Utility Certified", "Traffic Control Certified"],
    rating: 4.6,
    totalProjects: 29,
    activeProjects: 1,
    completedProjects: 28,
    status: "Active",
    joinDate: "2023-01-18",
    lastProject: "2024-01-05",
    hourlyRate: "$80",
    availability: "Available",
    website: "www.metrofiber.com",
    notes: "Excellent for urban infrastructure projects",
  },
  {
    id: "5",
    companyName: "Precision Networks",
    contactPerson: "Robert Kim",
    email: "r.kim@precisionnet.com",
    phone: "(555) 567-8901",
    address: {
      street: "7890 Precision Way",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
    },
    specialties: ["Design Engineering", "Network Planning", "Consultation"],
    services: ["Design", "Planning", "Consultation", "Project Management"],
    certifications: ["Professional Engineer", "Network Design Certified", "PMP"],
    rating: 4.9,
    totalProjects: 31,
    activeProjects: 2,
    completedProjects: 29,
    status: "Active",
    joinDate: "2022-06-12",
    lastProject: "2024-01-09",
    hourlyRate: "$120",
    availability: "Busy",
    notes: "Top-tier engineering and design expertise",
  },
]

const specialtyOptions = [
  "Underground Installation",
  "Aerial Installation",
  "Splicing",
  "Network Testing",
  "Commissioning",
  "Documentation",
  "Preventive Maintenance",
  "Emergency Repairs",
  "Upgrades",
  "Trenching",
  "Conduit Installation",
  "Site Restoration",
  "Design Engineering",
  "Network Planning",
  "Consultation",
  "Training",
  "Project Management",
]

const serviceOptions = [
  "Installation",
  "Maintenance",
  "Testing",
  "Emergency Repair",
  "Commissioning",
  "Documentation",
  "Training",
  "Troubleshooting",
  "Upgrades",
  "Trenching",
  "Conduit Installation",
  "Site Restoration",
  "Permits",
  "Design",
  "Planning",
  "Consultation",
  "Project Management",
]

const certificationOptions = [
  "OSHA Certified",
  "Fiber Optic Certified",
  "BICSI Certified",
  "Fluke Networks Certified",
  "OTDR Specialist",
  "NECA Certified",
  "Safety Trained",
  "Equipment Specialist",
  "Underground Utility Certified",
  "Traffic Control Certified",
  "Professional Engineer",
  "Network Design Certified",
  "PMP",
  "First Aid/CPR",
  "Confined Space Entry",
]

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>(initialContractors)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all")

  const [newContractor, setNewContractor] = useState<Partial<Contractor>>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    specialties: [],
    services: [],
    certifications: [],
    rating: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    status: "Active",
    hourlyRate: "",
    availability: "Available",
    website: "",
    notes: "",
  })

  const handleAddContractor = () => {
    if (!newContractor.companyName || !newContractor.contactPerson || !newContractor.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Company Name, Contact Person, Email)",
        variant: "destructive",
      })
      return
    }

    const contractor: Contractor = {
      id: (contractors.length + 1).toString(),
      companyName: newContractor.companyName,
      contactPerson: newContractor.contactPerson,
      email: newContractor.email,
      phone: newContractor.phone || "",
      address: newContractor.address || { street: "", city: "", state: "", zipCode: "" },
      specialties: newContractor.specialties || [],
      services: newContractor.services || [],
      certifications: newContractor.certifications || [],
      rating: newContractor.rating || 0,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      status: newContractor.status as "Active" | "Inactive" | "Pending" | "Suspended",
      joinDate: new Date().toISOString().split("T")[0],
      lastProject: "",
      hourlyRate: newContractor.hourlyRate || "",
      availability: newContractor.availability as "Available" | "Busy" | "Unavailable",
      website: newContractor.website,
      notes: newContractor.notes,
    }

    setContractors([...contractors, contractor])
    setNewContractor({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: { street: "", city: "", state: "", zipCode: "" },
      specialties: [],
      services: [],
      certifications: [],
      rating: 0,
      status: "Active",
      hourlyRate: "",
      availability: "Available",
      website: "",
      notes: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Contractor Added",
      description: `${contractor.companyName} has been added successfully.`,
    })
  }

  const toggleSpecialty = (specialty: string) => {
    const currentSpecialties = newContractor.specialties || []
    const updatedSpecialties = currentSpecialties.includes(specialty)
      ? currentSpecialties.filter((s) => s !== specialty)
      : [...currentSpecialties, specialty]

    setNewContractor({ ...newContractor, specialties: updatedSpecialties })
  }

  const toggleService = (service: string) => {
    const currentServices = newContractor.services || []
    const updatedServices = currentServices.includes(service)
      ? currentServices.filter((s) => s !== service)
      : [...currentServices, service]

    setNewContractor({ ...newContractor, services: updatedServices })
  }

  const toggleCertification = (certification: string) => {
    const currentCertifications = newContractor.certifications || []
    const updatedCertifications = currentCertifications.includes(certification)
      ? currentCertifications.filter((c) => c !== certification)
      : [...currentCertifications, certification]

    setNewContractor({ ...newContractor, certifications: updatedCertifications })
  }

  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      contractor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || contractor.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || contractor.specialties.some((s) => s === specialtyFilter)

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Busy":
        return "bg-yellow-100 text-yellow-800"
      case "Unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contractors</h1>
          <p className="text-muted-foreground">Manage your network of contractors and service providers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contractor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Contractor</DialogTitle>
              <DialogDescription>Enter the contractor information to add them to your network.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={newContractor.companyName}
                    onChange={(e) => setNewContractor({ ...newContractor, companyName: e.target.value })}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={newContractor.contactPerson}
                    onChange={(e) => setNewContractor({ ...newContractor, contactPerson: e.target.value })}
                    placeholder="Primary contact name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContractor.email}
                    onChange={(e) => setNewContractor({ ...newContractor, email: e.target.value })}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newContractor.phone}
                    onChange={(e) => setNewContractor({ ...newContractor, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={newContractor.address?.street}
                      onChange={(e) =>
                        setNewContractor({
                          ...newContractor,
                          address: { ...newContractor.address, street: e.target.value },
                        })
                      }
                      placeholder="Street address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newContractor.address?.city}
                      onChange={(e) =>
                        setNewContractor({
                          ...newContractor,
                          address: { ...newContractor.address, city: e.target.value },
                        })
                      }
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={newContractor.address?.state}
                      onChange={(e) =>
                        setNewContractor({
                          ...newContractor,
                          address: { ...newContractor.address, state: e.target.value },
                        })
                      }
                      placeholder="State"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    value={newContractor.hourlyRate}
                    onChange={(e) => setNewContractor({ ...newContractor, hourlyRate: e.target.value })}
                    placeholder="$85"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newContractor.status}
                    onValueChange={(value) => setNewContractor({ ...newContractor, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={newContractor.availability}
                    onValueChange={(value) => setNewContractor({ ...newContractor, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Busy">Busy</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={newContractor.website}
                  onChange={(e) => setNewContractor({ ...newContractor, website: e.target.value })}
                  placeholder="www.company.com"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Specialties</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={newContractor.specialties?.includes(specialty)}
                        onCheckedChange={() => toggleSpecialty(specialty)}
                      />
                      <Label htmlFor={specialty} className="text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Services Offered</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={newContractor.services?.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <Label htmlFor={service} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Certifications</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {certificationOptions.map((certification) => (
                    <div key={certification} className="flex items-center space-x-2">
                      <Checkbox
                        id={certification}
                        checked={newContractor.certifications?.includes(certification)}
                        onCheckedChange={() => toggleCertification(certification)}
                      />
                      <Label htmlFor={certification} className="text-sm">
                        {certification}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newContractor.notes}
                  onChange={(e) => setNewContractor({ ...newContractor, notes: e.target.value })}
                  placeholder="Additional notes about the contractor"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddContractor}>Add Contractor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search contractors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Briefcase className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {specialtyOptions.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContractors.map((contractor) => (
          <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{contractor.companyName}</CardTitle>
                    <CardDescription>{contractor.contactPerson}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(contractor.status)}>{contractor.status}</Badge>
                  <Badge variant="outline" className={getAvailabilityColor(contractor.availability)}>
                    {contractor.availability}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {contractor.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {contractor.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {contractor.address.city}, {contractor.address.state}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{contractor.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{contractor.totalProjects} projects</div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-green-600">{contractor.activeProjects}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-blue-600">{contractor.completedProjects}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-primary">{contractor.hourlyRate}</div>
                    <div className="text-xs text-muted-foreground">Rate</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Specialties</div>
                <div className="flex flex-wrap gap-1">
                  {contractor.specialties.slice(0, 3).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {contractor.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{contractor.specialties.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Certifications</div>
                <div className="flex flex-wrap gap-1">
                  {contractor.certifications.slice(0, 2).map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                  {contractor.certifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{contractor.certifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {contractor.notes && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Notes</div>
                  <div className="text-sm text-muted-foreground">{contractor.notes}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContractors.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No contractors found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" || specialtyFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first contractor"}
          </p>
          {!searchTerm && statusFilter === "all" && specialtyFilter === "all" && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Contractor
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
