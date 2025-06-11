"use client"

import Image from "next/image"
import { BarChart3, Building2, Home, Package, Users, Palette, Building, TrendingUp } from "lucide-react"

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
  SidebarTrigger, // Imported SidebarTrigger here
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Material", // Changed from "Stock Items"
    icon: Package,
    id: "stock",
  },
  {
    title: "Suppliers",
    icon: Users,
    id: "suppliers",
  },
  {
    title: "Projects",
    icon: Building2,
    id: "projects",
  },
  {
    title: "Stock Movements",
    icon: TrendingUp, // Re-added TrendingUp as it's used in Stock Movements card
    id: "movements",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Supplier Portal",
    icon: Building,
    id: "supplier-portal",
  },
  {
    title: "Theme Settings",
    icon: Palette,
    id: "theme",
  },
]

interface AppSidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
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
        {/* Moved SidebarTrigger here, inside the Sidebar component */}
        <SidebarTrigger className="-ml-1 text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveModule(item.id)} isActive={activeModule === item.id}>
                    <item.icon />
                    <span>{item.title}</span>
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
