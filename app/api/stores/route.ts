import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return new Response("Missing name", { status: 400 })
    }

    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    })

    return new Response(JSON.stringify(store))
  } catch (e) {
    console.log(e)
    return new Response("Internal error", { status: 500 })
  }
}
