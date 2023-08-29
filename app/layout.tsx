import "../styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ModalProvider } from "@/providers/ModalProvider"
import { Toaster } from "@/components/ui/Toaster"
import { ThemeProvider } from "@/providers/ThemesProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
