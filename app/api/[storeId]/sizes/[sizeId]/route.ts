import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, value } = body

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!name || !value) {
      return new Response("Missing label or igma url", { status: 400 })
    }
    if (!params.sizeId) {
      return new Response("Missing sizeId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const size = await db.size.updateMany({
      where: { id: params.sizeId },
      data: {
        name,
        value,
      },
    })

    return new Response(JSON.stringify(size), { status: 200 })
  } catch (err) {
    console.log("[SizePath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.sizeId) {
      return new Response("Missing sizeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const size = await db.size.deleteMany({
      where: { id: params.sizeId },
    })

    console.log("[SizeDelete]", size)

    return new Response(JSON.stringify(size), { status: 200 })
  } catch (err) {
    console.log("[SizedDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const size = await db.size.findUnique({
      where: { id: params.sizeId },
    })
    return new Response(JSON.stringify(size), { status: 200 })
  } catch (err) {
    console.log("[SizeGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
