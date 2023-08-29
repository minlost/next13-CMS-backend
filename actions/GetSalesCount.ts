import { db } from "@/lib/client/prismaDb"

export const getSalesCount = async (storeId: string) => {
  const salesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  })

  return salesCount
}
