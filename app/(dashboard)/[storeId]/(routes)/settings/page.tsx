import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { FC } from "react"
import SettingForm from "./components/SettingForm"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

const SettingsPage: FC<SettingsPageProps> = async ({ params }) => {
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
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
