"use client"

import Heading from "@/components/heading/Heading"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { Separator } from "@/components/ui/Separator"
import { DataTable } from "@/components/ui/DataTable"
import { CategoryColumn, columns } from "./Columns"
import ApiList from "@/components/ui/ApiList"

interface CategorylientProps {
  data: CategoryColumn[]
}

const CategoryClient: FC<CategorylientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Categories (${data.length})`}
          description="Spravujte své kategorie zde"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nová kategorie
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="Categories" description="Categories API" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  )
}

export default CategoryClient
