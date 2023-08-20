import { db } from "@/lib/client/prismaDb"
import { format } from "date-fns"
import CarouselClient from "./components/CarouselClient"
import { CarouselColumn } from "./components/Columns"

interface CarouselsPageProps {
  params: {
    storeId: string
  }
}

const CaruoselsPage = async ({ params }: CarouselsPageProps) => {
  const caruosels = await db.carousel.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedCaruosels: CarouselColumn[] = caruosels.map((carousel) => ({
    id: carousel.id,
    label: carousel.label,
    createdAt: format(carousel.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CarouselClient data={formatedCaruosels} />
      </div>
    </div>
  )
}

export default CaruoselsPage
