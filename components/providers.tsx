"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"

/**
 * All client-side providers wrapped in one component
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="velocity-fibre-theme"
    >
      <SidebarProvider>
        {children}
        <SonnerToaster />
        <ShadcnToaster />
      </SidebarProvider>
    </ThemeProvider>
  )
}