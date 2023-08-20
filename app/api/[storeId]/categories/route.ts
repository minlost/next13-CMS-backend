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
    const { name, billboardId } = body

    if (!name || !billboardId) {
      return new Response("Missing name or billboardId", { status: 400 })
    }

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    })
    console.log("[categoryPost]", category)
    return new Response(JSON.stringify(category), { status: 200 })
  } catch (err) {
    console.log("[BillboardPatch]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  console.log("tisknu")
  try {
    // const { userId } = auth()

    // if (!userId) {
    //   return new Response("Unauthenticated", { status: 401 })
    // }

    if (!params.storeId) {
      return new Response("Missing sotrID", { status: 400 })
    }

    const categories = await db.category.findMany({
      where: { storeId: params.storeId },
    })

    return new Response(JSON.stringify(categories), { status: 200 })
  } catch (err) {
    console.log("[CategoriesGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
