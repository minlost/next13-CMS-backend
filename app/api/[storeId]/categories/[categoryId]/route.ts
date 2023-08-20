import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  console.log("[categoryPath]", params)
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, billboardId } = body

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!name || !billboardId) {
      return new Response("Missing label or igma url", { status: 400 })
    }
    if (!params.categoryId) {
      return new Response("Missing categoryId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const category = await db.category.updateMany({
      where: { id: params.categoryId },
      data: {
        name,
        billboardId,
      },
    })

    return new Response(JSON.stringify(category), { status: 200 })
  } catch (err) {
    console.log("[categoryPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.categoryId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const category = await db.category.deleteMany({
      where: { id: params.categoryId },
    })

    console.log("[categorydDelete]", category)

    return new Response(JSON.stringify(category), { status: 200 })
  } catch (err) {
    console.log("[categoryIdDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const category = await db.category.findUnique({
      where: { id: params.categoryId },
      include: {
        billboard: true,
      },
    })
    console.log(category)
    return new Response(JSON.stringify(category), { status: 200 })
  } catch (err) {
    console.log("[categoryIdGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
