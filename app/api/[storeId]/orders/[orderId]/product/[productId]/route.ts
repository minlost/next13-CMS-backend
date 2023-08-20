import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { storeId: string; orderId: string; productId: string } }
) {
  try {
    const { quantity, price } = await req.json()
    if (!quantity || !price) {
      return new Response("Missing quantity or price", { status: 400 })
    }

    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.orderId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const orderItem = await db.orderItem.findFirst({
      where: {
        orderId: params.orderId,
        productId: params.productId,
      },
      include: {
        product: true,
      },
    })
    if (!orderItem) {
      return new Response("Order item not found", { status: 404 })
    }
    const updatedOrderItem = await db.orderItem.update({
      where: { id: orderItem.id },
      data: {
        // your update parameters go here, e.g.:
        quantity: quantity,
        price: price,
      },
    })
    console.log("[OrderPath]", updatedOrderItem)

    return new Response(JSON.stringify(orderItem), { status: 200 })
  } catch (err) {
    console.log("[OrderPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.orderId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const order = await db.order.deleteMany({
      where: { id: params.orderId },
    })

    return new Response(JSON.stringify(order), { status: 200 })
  } catch (err) {
    console.log("[orderDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}
