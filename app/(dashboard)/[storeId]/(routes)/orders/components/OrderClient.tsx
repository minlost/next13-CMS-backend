"use client"

import Heading from "@/components/heading/Heading"
import { DataTable } from "@/components/ui/DataTable"
import { Separator } from "@/components/ui/Separator"
import { FC } from "react"
import { OrderColumn, columns } from "./Columns"

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Objednávky (${data.length})`}
        description="Spravujte objednávky"
      />

      <Separator />

      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  )
}

export default OrderClient
