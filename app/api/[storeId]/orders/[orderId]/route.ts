import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { email, phone } = body
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!email || !phone) {
      return new Response("Missing email or phone", { status: 400 })
    }
    if (!params.orderId) {
      return new Response("Missing orderId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const order = await db.order.updateMany({
      where: { id: params.orderId },
      data: {
        phone,
        email,
      },
    })

    return new Response(JSON.stringify(order), { status: 200 })
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

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const order = await db.order.findUnique({
      where: { id: params.orderId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                size: true,
                color: true,
              },
            },
          },
        },
      },
    })

    return new Response(JSON.stringify(order), { status: 200 })
  } catch (err) {
    console.log("[BillboardIdGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
