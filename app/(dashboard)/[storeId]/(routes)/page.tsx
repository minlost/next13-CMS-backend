import { db } from "@/lib/client/prismaDb"
import { FC } from "react"

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  console.log(params)
  const store = await db.store.findUnique({
    where: { id: params.storeId },
  })

  return <div>{store?.name}</div>
}

export default DashboardPage
