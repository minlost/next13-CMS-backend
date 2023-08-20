"use client"

import Heading from "@/components/heading/Heading"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { Separator } from "@/components/ui/Separator"
import { DataTable } from "@/components/ui/DataTable"
import { BillboardColumn, columns } from "./Columns"
import ApiList from "@/components/ui/ApiList"

interface BillboardClientProps {
  data: BillboardColumn[]
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage your billboards here"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="Billboards" description="Manage your billboards here" />
      <Separator />
      <ApiList entityIdName="billboards" entityName="billboards" />
    </>
  )
}

export default BillboardClient
