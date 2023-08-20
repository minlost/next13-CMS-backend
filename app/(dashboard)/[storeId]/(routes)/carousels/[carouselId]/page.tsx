import { db } from "@/lib/client/prismaDb"
import CarouselForm from "./components/CarouselForm"

interface CarouselPageProps {
  params: {
    carouselId: string
  }
}

const CarouselPage = async ({ params }: CarouselPageProps) => {
  const carousel = await db.carousel.findUnique({
    where: {
      id: params.carouselId,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <CarouselForm initialData={carousel} />
      </div>
    </div>
  )
}

export default CarouselPage
