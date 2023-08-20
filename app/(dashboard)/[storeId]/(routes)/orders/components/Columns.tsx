"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

type Addresss = {
  street: string
  city: string
  zip: string
  country: string
}

export type OrderColumn = {
  id: string
  phone: string
  address: Addresss[]
  isPaid: boolean
  products: string
  totalPrice: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "adress",
    header: "Adress",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
