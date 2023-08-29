import { db } from "@/lib/client/prismaDb"
import BillboardForm from "./components/ProductForm"
import ProductForm from "./components/ProductForm"

interface ProductPageProps {
  params: {
    productId: string
    storeId: string
  }
}

const ProductdPage = async ({ params }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  })

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  )
}

export default ProductdPage
