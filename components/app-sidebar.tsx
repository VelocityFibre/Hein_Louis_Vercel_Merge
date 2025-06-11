"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Building2, 
  Home, 
  Package, 
  Users, 
  Palette, 
  Building, 
  TrendingUp,
  ClipboardList,
  AlertCircle,
  HardHat,
  Shield,
  UserCircle,
  Settings
} from "lucide-react"

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
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Projects",
    icon: Building2,
    href: "/projects",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    href: "/tasks",
  },
  {
    title: "Issues",
    icon: AlertCircle,
    href: "/issues",
  },
  {
    title: "Contractors",
    icon: HardHat,
    href: "/contractors",
  },
  {
    title: "Material",
    icon: Package,
    href: "/stock",
  },
  {
    title: "Suppliers",
    icon: Building,
    href: "/suppliers",
  },
  {
    title: "Stock Movements",
    icon: TrendingUp,
    href: "/movements",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Audit",
    icon: Shield,
    href: "/audit",
  },
  {
    title: "Customer Portal",
    icon: UserCircle,
    href: "/customer-portal",
  },
  {
    title: "Supplier Portal",
    icon: Building,
    href: "/supplier-portal",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Theme Settings",
    icon: Palette,
    href: "/theme",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  
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
        <SidebarTrigger className="-ml-1 text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
