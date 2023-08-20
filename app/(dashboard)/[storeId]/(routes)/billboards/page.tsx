import { db } from "@/lib/client/prismaDb"
import BillboardClient from "./components/BillboardClient"
import { BillboardColumn } from "./components/Columns"
import { format } from "date-fns"

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
