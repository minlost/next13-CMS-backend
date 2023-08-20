import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthenticated", { status: 401 })
    }

    if (!params.storeId) {
      return new Response("Missing sotrID", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { imageUrl, label } = body

    if (!imageUrl || !label) {
      return new Response("Missing imageUrl or label", { status: 400 })
    }

    const billboard = await db.billboard.create({
      data: {
        imageUrl,
        label,
        storeId: params.storeId,
      },
    })
    console.log("[BillboardPost]", billboard)
    return new Response(JSON.stringify(billboard), { status: 200 })
  } catch (err) {
    console.log("[BillboardPatch]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthenticated", { status: 401 })
    }

    if (!params.storeId) {
      return new Response("Missing sotrID", { status: 400 })
    }

    const billboards = await db.billboard.findMany({
      where: { storeId: params.storeId },
    })

    return new Response(JSON.stringify(billboards), { status: 200 })
  } catch (err) {
    console.log("[BillboardPatch]", err)
    return new Response("Initial error", { status: 500 })
  }
}
