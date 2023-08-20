import { db } from "@/lib/client/prismaDb"
import OrderDetail from "./components/OrderDetail"

interface OrderPageProps {
  params: {
    orderId: string
  }
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: true,
      address: true,
    },
  })
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        {order && <OrderDetail initialData={order} />}
      </div>
    </div>
  )
}

export default OrderPage
