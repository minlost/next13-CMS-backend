import { db } from "@/lib/client/prismaDb"

interface GraphData {
  name: string
  total: number
}

export const getGraphRevenue = async (
  storeId: string
): Promise<GraphData[]> => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  const monthlyRevenue: { [key: number]: number } = {}

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth()
    let revenueForOrder = 0

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
  }

  const graphData: GraphData[] = [
    { name: "Leden", total: 0 },
    { name: "Únor", total: 0 },
    { name: "Březen", total: 0 },
    { name: "Duben", total: 0 },
    { name: "Květen", total: 0 },
    { name: "Červen", total: 0 },
    { name: "Červenec", total: 0 },
    { name: "Srpen", total: 0 },
    { name: "Zaří", total: 0 },
    { name: "Říjen", total: 0 },
    { name: "Listopad", total: 0 },
    { name: "Prosinec", total: 0 },
  ]

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }

  return graphData
}
