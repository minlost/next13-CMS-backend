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
    const { imageUrl, label, link } = body

    if (!imageUrl || !link) {
      return new Response("Missing imageUrl  or link", { status: 400 })
    }

    const carousel = await db.carousel.create({
      data: {
        imageUrl,
        label,
        link,
        storeId: params.storeId,
      },
    })
    console.log("[CorouselPost]", carousel)
    return new Response(JSON.stringify(carousel), { status: 200 })
  } catch (err) {
    console.log("[CorouselPatch]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  console.log("[carouselIdGet]", params)
  try {
    if (!params.storeId) {
      return new Response("Missing sotrID", { status: 400 })
    }

    const carousels = await db.carousel.findMany({
      where: { storeId: params.storeId },
    })

    return new Response(JSON.stringify(carousels), { status: 200 })
  } catch (err) {
    console.log("[CarouselPatch]", err)
    return new Response("Initial error", { status: 500 })
  }
}
