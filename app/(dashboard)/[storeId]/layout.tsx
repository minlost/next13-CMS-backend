import Navbar from "@/components/navabar/Navbar"
import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
interface DashboardLayoutProps {
  children: React.ReactNode
  params: {
    storeId: string
  }
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = auth()
  if (!userId) {
    redirect("/sign-in")
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect("/")
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
