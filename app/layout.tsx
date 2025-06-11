import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Velocity Fibre Stock Management',
  description: 'Stock management system for Velocity Fibre',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <SidebarInset className="flex-1">
                <main className="h-full overflow-y-auto">
                  {children}
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}