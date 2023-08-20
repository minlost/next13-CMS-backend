"use client"

import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type ProductColumn = {
  id: string
  quantity: number
  product: Product
  price: number
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "product.name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "product.size.name",
    header: "Size",
  },
  {
    accessorKey: "product.color.name",
    header: "Color",
  },
  {
    accessorKey: `product.price `,
    header: "Total price",
    cell: ({ row }) => (
      <div>{row.original.price * row.original.quantity + " ,-"}</div>
    ),
  },
  {
    accessorKey: `product.price `,
    header: "Price per item",
    cell: ({ row }) => <div>{row.original.price + " ,-"}</div>,
  },

  {
    id: "action",
    cell: ({ row }) => <CellAction initialdata={row.original} />,
  },
]
