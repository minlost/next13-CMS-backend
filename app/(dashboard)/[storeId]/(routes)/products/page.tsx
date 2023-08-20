import { db } from "@/lib/client/prismaDb"
import { priceFormatter } from "@/lib/formaters/priceFormatter"
import { format } from "date-fns"
import { ProductColumn } from "./components/Columns"
import ProductClient from "./components/ProductClient"

interface ProductPageProps {
  params: {
    storeId: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: priceFormatter.format(product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    createdAt: format(product.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatedProducts} />
      </div>
    </div>
  )
}

export default ProductPage
