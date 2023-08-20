import { db } from "@/lib/client/prismaDb"
import { format } from "date-fns"
import { ColorColumn } from "./components/Columns"
import ColorClient from "./components/SizeClient"

interface ColorPageProps {
  params: {
    storeId: string
  }
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedSizes: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formatedSizes} />
      </div>
    </div>
  )
}

export default ColorPage
