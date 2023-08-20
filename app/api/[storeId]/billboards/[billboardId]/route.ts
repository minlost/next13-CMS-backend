import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { imageUrl, label } = body

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!label || !imageUrl) {
      return new Response("Missing label or igma url", { status: 400 })
    }
    if (!params.billboardId) {
      return new Response("Missing billboardId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const billboard = await db.billboard.updateMany({
      where: { id: params.billboardId },
      data: {
        imageUrl,
        label,
      },
    })

    return new Response(JSON.stringify(billboard), { status: 200 })
  } catch (err) {
    console.log("[BillboardsPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  console.log("[BillboardIdDelete]", params)
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.billboardId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const billboard = await db.billboard.deleteMany({
      where: { id: params.billboardId },
    })

    console.log("[BillboardIdDelete]", billboard)

    return new Response(JSON.stringify(billboard), { status: 200 })
  } catch (err) {
    console.log("[BillboardIdDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const billboard = await db.billboard.findUnique({
      where: { id: params.billboardId },
    })
    return new Response(JSON.stringify(billboard), { status: 200 })
  } catch (err) {
    console.log("[BillboardIdGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
