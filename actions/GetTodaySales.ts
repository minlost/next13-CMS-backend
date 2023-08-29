import { db } from "@/lib/client/prismaDb"

export const getTodaySales = async (storeId: string) => {
  const todaySalesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  })

  return todaySalesCount
}
