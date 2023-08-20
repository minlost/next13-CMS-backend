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
    const { name, value } = body

    if (!name || !value) {
      return new Response("Missing name or value", { status: 400 })
    }

    const size = await db.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    })
    console.log("[sizesPost]", size)
    return new Response(JSON.stringify(size), { status: 200 })
  } catch (err) {
    console.log("[sizesPost]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new Response("Missing sotreID", { status: 400 })
    }

    const sizes = await db.size.findMany({
      where: { storeId: params.storeId },
    })

    return new Response(JSON.stringify(sizes), { status: 200 })
  } catch (err) {
    console.log("[SizeGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
