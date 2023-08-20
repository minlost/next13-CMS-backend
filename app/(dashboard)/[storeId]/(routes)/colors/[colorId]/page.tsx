import { db } from "@/lib/client/prismaDb"
import BillboardForm from "./components/ColorForm"
import SizeForm from "./components/ColorForm"
import ColorForm from "./components/ColorForm"

interface ColorPageProps {
  params: {
    colorId: string
  }
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage
