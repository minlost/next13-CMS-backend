import { db } from "@/lib/client/prismaDb"
import BillboardForm from "./components/SizeForm"
import SizeForm from "./components/SizeForm"

interface SizePageProps {
  params: {
    sizeId: string
  }
}

const SizePage = async ({ params }: SizePageProps) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default SizePage
