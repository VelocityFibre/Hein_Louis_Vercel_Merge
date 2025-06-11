"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Building2, 
  Home, 
  Package, 
  Users, 
  ClipboardList,
  TrendingUp,
  FileText,
  UserCheck,
  AlertCircle,
  Building,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

const menuItems = [
  {
    title: "Main Navigation",
    items: [
      { title: "Dashboard", icon: Home, href: "/" },
      { title: "Projects", icon: Building2, href: "/projects" },
      { title: "Customers", icon: Users, href: "/customers" },
      { title: "Tasks", icon: ClipboardList, href: "/tasks" },
      { title: "Issues", icon: AlertCircle, href: "/issues" },
      { title: "Contractors", icon: UserCheck, href: "/contractors" },
    ]
  },
  {
    title: "Stock Management",
    items: [
      { title: "Material", icon: Package, href: "/stock" },
      { title: "Stock Movements", icon: TrendingUp, href: "/movements" },
      { title: "Bill of Quantities", icon: FileText, href: "/boq" },
    ]
  },
  {
    title: "Suppliers & Portals",
    items: [
      { title: "Suppliers & RFQ", icon: Building, href: "/suppliers" },
      { title: "Supplier Portal", icon: Building, href: "/supplier-portal" },
      { title: "Customer Portal", icon: Users, href: "/customer-portal" },
    ]
  },
  {
    title: "Analytics & Settings",
    items: [
      { title: "Analytics", icon: BarChart3, href: "/analytics" },
      { title: "Audit Trail", icon: FileText, href: "/audit" },
      { title: "Settings", icon: Settings, href: "/settings" },
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentUser, logout } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 velocity-gradient-dark">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-full h-12">
            <Image
              src="/images/velocity-logo-white.png"
              alt="Velocity Fibre"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <p className="text-sm text-white/80">Stock Management System</p>
        </div>
        <div className="mt-4 flex justify-end">
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        {currentUser && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{currentUser.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground">{currentUser.role}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}