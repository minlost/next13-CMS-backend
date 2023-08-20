"use client"

import Heading from "@/components/heading/Heading"
import ApiList from "@/components/ui/ApiList"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/DataTable"
import { Separator } from "@/components/ui/Separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { CarouselColumn, columns } from "./Columns"

interface CarouselClientProps {
  data: CarouselColumn[]
}

const CarouselClient: FC<CarouselClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Carousels (${data.length})`}
          description="Manage your Carousels here - max 4 carousels"
        />
        {data.length >= 4 ? (
          <Button
            disabled
            onClick={() => router.push(`/${params.storeId}/carousels/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        ) : (
          <Button
            onClick={() => router.push(`/${params.storeId}/carousels/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="Carousels" description="Manage your Carousels here" />
      <Separator />
      <ApiList entityIdName="carousel" entityName="carousels" />
    </>
  )
}

export default CarouselClient
