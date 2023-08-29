import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()
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
      quantity,
    } = body

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (!name || !price || !categoryId || !colorId || !sizeId) {
      return new Response("Missing something, fill all options", {
        status: 400,
      })
    }
    if (!images || !images.length) {
      return new Response("Missing images", { status: 400 })
    }

    if (!params.productId) {
      return new Response("Missing productdId", { status: 400 })
    }
    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    await db.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        quantity,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    })
    const product = await db.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return new Response(JSON.stringify(product), { status: 200 })
  } catch (err) {
    console.log("[ProductPath]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 400 })
    }

    if (!params.productId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const sotreByUserId = await db.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!sotreByUserId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const product = await db.product.deleteMany({
      where: { id: params.productId },
    })

    console.log("[productDelete]", product)

    return new Response(JSON.stringify(product), { status: 200 })
  } catch (err) {
    console.log("[productIdDelete]", err)
    return new Response("Initial error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new Response("Missing storeId", { status: 400 })
    }

    const product = await db.product.findUnique({
      where: { id: params.productId },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    })
    return new Response(JSON.stringify(product), { status: 200 })
  } catch (err) {
    console.log("[ProductGet]", err)
    return new Response("Initial error", { status: 500 })
  }
}
