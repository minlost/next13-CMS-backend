import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  const body = await req.json()

  const { city, street, zip, country } = body

  try {
    const { userId } = auth()
    const { city, street, zip, country } = body
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!city || !street || !zip || !country) {
      return new Response("Missing adress data", { status: 400 })
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

    const address = await db.address.updateMany({
      where: { orderId: params.orderId },
      data: {
        city: city,
        street: street,
        zip: zip,
        country: country,
      },
    })

    return new Response(JSON.stringify(address), { status: 200 })
  } catch (err) {
    console.log("[OrderPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}
