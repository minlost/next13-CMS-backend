"use client"

import Heading from "@/components/heading/Heading"
import ApiList from "@/components/ui/ApiList"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/DataTable"
import { Separator } from "@/components/ui/Separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { ColorColumn, columns } from "./Columns"

interface ColorClientProps {
  data: ColorColumn[]
}

const ColorClient: FC<ColorClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Color (${data.length})`}
          description="Spravujte své barvy zde"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Nový
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="Colors" description="Colors API" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors" />
    </>
  )
}

export default ColorClient
