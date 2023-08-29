import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; id: string } }
) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.redirect("/login")
  }

  try {
    const article = await db.article.delete({
      where: {
        id: params.id,
        storeId: params.storeId,
      },
    })
    console.log("[article]", article)
    return new Response(JSON.stringify(article), { status: 200 })
  } catch (error) {
    return new Response("Could not post article", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; id: string } }
) {
  const body = await req.json()
  console.log("[body]", body)
  const { title, content } = body
  const { userId } = auth()

  if (!userId) {
    return NextResponse.redirect("/login")
  }

  try {
    const article = await db.article.update({
      where: {
        id: params.id,
        storeId: params.storeId,
      },

      data: {
        title: title,
        content,
        userId: userId,
        storeId: params.storeId,
      },
    })

    return new Response(JSON.stringify(article), { status: 200 })
  } catch (error) {
    return new Response("Could not post article", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; id: string } }
) {
  if (!params.storeId) {
    return new Response("No storeId", { status: 500 })
  }

  try {
    const article = await db.article.findFirst({
      where: {
        storeId: params.storeId,
        id: params.id,
      },
    })

    return new Response(JSON.stringify(article), { status: 200 })
  } catch (error) {
    return new Response("Could not post article", { status: 500 })
  }
}
