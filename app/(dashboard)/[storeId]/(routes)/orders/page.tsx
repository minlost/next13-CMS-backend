import { db } from "@/lib/client/prismaDb"
import { priceFormatter } from "@/lib/formaters/priceFormatter"
import { format } from "date-fns"
import { OrderColumn } from "./components/Columns"
import BillboardClient from "./components/OrderClient"
import OrderClient from "./components/OrderClient"

interface OrderPageProps {
  params: {
    storeId: string
  }
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    isPaid: order.isPaid,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name + " x " + orderItem.quantity)
      .join(", "),

    totalPrice: priceFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.price) * item.quantity
      }, 0)
    ),

    createdAt: format(order.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatedOrders} />
      </div>
    </div>
  )
}

export default OrderPage
