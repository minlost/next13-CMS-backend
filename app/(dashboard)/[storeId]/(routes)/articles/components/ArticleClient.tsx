"use client"

import Heading from "@/components/heading/Heading"
import ApiList from "@/components/ui/ApiList"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/DataTable"
import { Separator } from "@/components/ui/Separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { ArticleColumn, columns } from "./Columns"

interface ArticlelientProps {
  data: ArticleColumn[]
}

const ArticleClient: FC<ArticlelientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Articles (${data.length})`}
          description="Spravujte své články zde"
        />
        <Button onClick={() => router.push(`/${params.storeId}/articles/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Nový článek
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
      <Heading title="Categories" description="Spravuj články zde" />
      <Separator />
      <ApiList entityIdName="articleId" entityName="articles" />
    </>
  )
}

export default ArticleClient
