import { db } from "@/lib/client/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json()
  console.log("[body]", body)
  const { title, content, subredditId } = body
  const { userId } = auth()

  if (!userId) {
    return NextResponse.redirect("/login")
  }

  try {
    const article = await db.article.create({
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
  { params }: { params: { storeId: string } }
) {
  if (!params.storeId) {
    return new Response("No storeId", { status: 500 })
  }

  try {
    const article = await db.article.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return new Response(JSON.stringify(article), { status: 200 })
  } catch (error) {
    return new Response("Could not post article", { status: 500 })
  }
}
