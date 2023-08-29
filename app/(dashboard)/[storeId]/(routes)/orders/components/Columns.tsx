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
    header: "Zakoupené produkty",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "adress",
    header: "Adresa",
  },
  {
    accessorKey: "totalPrice",
    header: "Celková cena",
  },
  {
    accessorKey: "isPaid",
    header: "Zaplaceno",
  },
  {
    accessorKey: "createdAt",
    header: "Datum vztvoření  ",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
