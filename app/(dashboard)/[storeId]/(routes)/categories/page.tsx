import { db } from "@/lib/client/prismaDb"

import { format } from "date-fns"
import { CategoryColumn } from "./components/Columns"
import BillboardClient from "./components/CategoryClient"
import CategoryClient from "./components/CategoryClient"

interface CategoriesPageProps {
  params: {
    storeId: string
  }
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatedCategories} />
      </div>
    </div>
  )
}

export default CategoriesPage
