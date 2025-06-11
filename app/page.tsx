"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { StockItems } from "@/components/stock-items"
import { Suppliers } from "@/components/suppliers"
import { Projects } from "@/components/projects"
import { BOQManagement } from "@/components/boq-management"
import { RFQManagement } from "@/components/rfq-management"
import { StockMovements } from "@/components/stock-movements"
import { Analytics } from "@/components/analytics"
import { ThemeSettings } from "@/components/theme-settings"
import { SupplierPortal } from "@/components/supplier-portal"
import { QuoteAnalysis } from "@/components/quote-analysis"

export default function Home() {
  const searchParams = useSearchParams()
  const moduleParam = searchParams.get('module')
  const [activeModule, setActiveModule] = useState(moduleParam || "dashboard")
  
  useEffect(() => {
    if (moduleParam) {
      setActiveModule(moduleParam)
    }
  }, [moduleParam])

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />
      case "stock":
        return <StockItems setActiveModule={setActiveModule} />
      case "suppliers":
        return <Suppliers setActiveModule={setActiveModule} />
      case "projects":
        return <Projects />
      case "boq":
        return <BOQManagement />
      case "rfq":
        return <RFQManagement />
      case "movements":
        return <StockMovements />
      case "analytics":
        return <Analytics />
      case "supplier-portal":
        return <SupplierPortal supplierId="SUP-001" />
      case "theme":
        return <ThemeSettings />
      case "quote-analysis":
        return <QuoteAnalysis />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-500">Velocity Fibre Stock Management</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">{renderModule()}</main>
      </SidebarInset>
    </>
  )
}
