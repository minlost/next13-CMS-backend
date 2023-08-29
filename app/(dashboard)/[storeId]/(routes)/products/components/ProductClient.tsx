"use client"

import Heading from "@/components/heading/Heading"
import ApiList from "@/components/ui/ApiList"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/DataTable"
import { Separator } from "@/components/ui/Separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { ProductColumn, columns } from "./Columns"

interface ProductClientProps {
  data: ProductColumn[]
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Products (${data.length})`}
          description="Spravujte své produkty zde"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Nový produkt
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="Products" description="Products API" />
      <Separator />
      <ApiList entityIdName="productsId" entityName="products" />
    </>
  )
}

export default ProductClient
