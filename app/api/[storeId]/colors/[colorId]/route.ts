import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
    if (!params.colorId) {
      return new Response("Missing colorId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const color = await db.color.updateMany({
      where: { id: params.colorId },
      data: {
        name,
        value,
      },
    })

    return new Response(JSON.stringify(color), { status: 200 })
  } catch (err) {
    console.log("[colorPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.colorId) {
      return new Response("Missing colorId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const color = await db.color.deleteMany({
      where: { id: params.colorId },
    })

    console.log("[colorDelete]", color)

    return new Response(JSON.stringify(color), { status: 200 })
  } catch (err) {
    console.log("[colordDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const color = await db.color.findUnique({
      where: { id: params.colorId },
    })
    return new Response(JSON.stringify(color), { status: 200 })
  } catch (err) {
    console.log("[colorGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
