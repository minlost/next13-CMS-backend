import { db } from "@/lib/client/prismaDb"
import BillboardForm from "./components/BillBoardForm"

interface BillboardPageProps {
  params: {
    billboardId: string
  }
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage
