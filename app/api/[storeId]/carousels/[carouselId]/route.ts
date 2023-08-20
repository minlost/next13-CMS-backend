import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; carouselId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { imageUrl, label, link } = body

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!label || !imageUrl) {
      return new Response("Missing label or igma url", { status: 400 })
    }
    if (!params.carouselId) {
      return new Response("Missing carouselId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const carousel = await db.carousel.updateMany({
      where: { id: params.carouselId },
      data: {
        imageUrl,
        label,
        link,
      },
    })

    return new Response(JSON.stringify(carousel), { status: 200 })
  } catch (err) {
    console.log("[carouselsPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; carouselId: string } }
) {
  console.log("[carouselIdDelete]", params)
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.carouselId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const carousel = await db.carousel.deleteMany({
      where: { id: params.carouselId },
    })

    console.log("[carouselIdDelete]", carousel)

    return new Response(JSON.stringify(carousel), { status: 200 })
  } catch (err) {
    console.log("[carouselIdDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { carouselId: string } }
) {
  try {
    if (!params.carouselId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const carousel = await db.carousel.findUnique({
      where: { id: params.carouselId },
    })
    return new Response(JSON.stringify(carousel), { status: 200 })
  } catch (err) {
    console.log("[carouselIdGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
