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
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body

    if (!name || !price || !categoryId || !colorId || !sizeId) {
      return new Response("Missing something, fill all options", {
        status: 400,
      })
    }
    if (!images || !images.length) {
      return new Response("Missing images", { status: 400 })
    }

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    console.log("[ProductPost]", product)
    return new Response(JSON.stringify(product), { status: 200 })
  } catch (err) {
    console.log("[ProductPost]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth()
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    // if (!userId) {
    //   return new Response("Unauthenticated", { status: 401 })
    // }

    if (!params.storeId) {
      return new Response("Missing sotrID", { status: 400 })
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return new Response(JSON.stringify(products), { status: 200 })
  } catch (err) {
    console.log("[ProductPatch]", err)
    return new Response("Initial error", { status: 500 })
  }
}
