import { db } from "@/lib/client/prismaDb"
import CategoryForm from "./components/CategoryForm"

interface categoryPageProps {
  params: {
    storeId: string
    categoryId: string
  }
}

const CategoryPage = async ({ params }: categoryPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  })
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  )
}

export default CategoryPage
