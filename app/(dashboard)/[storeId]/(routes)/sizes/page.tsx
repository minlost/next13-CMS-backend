import { db } from "@/lib/client/prismaDb"
import { format } from "date-fns"
import { SizeColumn } from "./components/Columns"
import SizeClient from "./components/SizeClient"

interface SizePageProps {
  params: {
    storeId: string
  }
}

const SizesPage = async ({ params }: SizePageProps) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formatedSizes} />
      </div>
    </div>
  )
}

export default SizesPage
