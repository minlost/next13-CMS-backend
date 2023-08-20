import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("params", params)
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!name) {
      return new Response("Missing name", { status: 400 })
    }
    if (!params.id) {
      return new Response("Missing storeId", { status: 400 })
    }

    const store = await db.store.updateMany({
      where: { id: params.id },
      data: { name },
    })

    return new Response(JSON.stringify(store), { status: 200 })
  } catch (err) {
    console.log("[StorePath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    if (!params.id) {
      return new Response("Missing storeId", { status: 400 })
    }

    const store = await db.store.deleteMany({
      where: { id: params.id },
    })

    return new Response(JSON.stringify(store), { status: 200 })
  } catch (err) {
    console.log("[StoreDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}
