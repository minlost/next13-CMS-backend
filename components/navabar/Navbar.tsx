import { UserButton, auth } from "@clerk/nextjs"
import { FC } from "react"
import MainNav from "./MainNav"
import StoreSwitcher from "./StoreSwitcher"
import { redirect } from "next/navigation"
import { db } from "@/lib/client/prismaDb"
import { ThemeBtn } from "../ui/ThemeBtn"

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="">
          <StoreSwitcher items={stores} />
        </div>
        <div className="">
          <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex item-center space-x-4">
          <UserButton afterSignOutUrl="/" />
          <ThemeBtn />
        </div>
      </div>
    </div>
  )
}

export default Navbar
