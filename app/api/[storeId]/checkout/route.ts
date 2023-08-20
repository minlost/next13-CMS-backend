import Stripe from "stripe"

import { NextResponse } from "next/server"

import { db } from "@/lib/client/prismaDb"
import { stripe } from "@/lib/stripe/stripe"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface ProductIds {
  id: string
  quantity: number
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds, data } = await req.json()

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 })
  }

  const value = productIds.map((productId: ProductIds) => productId.id)

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds.map((productId: ProductIds) => productId.id),
      },
    },
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach((product) => {
    line_items.push({
      quantity: productIds.find(
        (productId: ProductIds) => productId.id === product.id
      )?.quantity,
      price_data: {
        currency: "CZK",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    })
  })

  const order = await db.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: ProductIds) => ({
          quantity: productId.quantity,
          price:
            productId.quantity *
            (products.find((product) => product.id === productId.id)?.price ??
              0),
          product: {
            connect: {
              id: productId.id,
            },
          },
        })),
      },
      email: data.email,
      phone: data.phone,
      address: {
        create: {
          street: data.street,
          city: data.city,
          zip: data.zip,
          country: data.country,
        },
      },
    },
  })

  const customer = await stripe.customers.create({
    name: data.fName + " " + data.lName,
    email: data.email,
    phone: data.phone,
    address: {
      line1: data.street,
      city: data.city,
      postal_code: data.zip,
      country: data.country,
    },
  })

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  })

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  )
}
