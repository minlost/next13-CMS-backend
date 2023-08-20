"use client"

import Heading from "@/components/heading/Heading"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { Separator } from "@/components/ui/Separator"
import { DataTable } from "@/components/ui/DataTable"
import { SizeColumn, columns } from "./Columns"
import ApiList from "@/components/ui/ApiList"

interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: FC<SizeClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage your sizes here"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="Sizes" description="Manage your sizes here" />
      <Separator />
      <ApiList entityIdName="sizes" entityName="sizes" />
    </>
  )
}

export default SizeClient
