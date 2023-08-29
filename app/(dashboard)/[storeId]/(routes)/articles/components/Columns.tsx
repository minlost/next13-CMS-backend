"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { formatDateToDDMMYY } from "@/lib/formaters/dateFormater"

export type ArticleColumn = {
  id: string
  title: string
  content: any
  createdAt: Date
  updatedAt: Date
  userId: string
  storeId: string
}

export const columns: ColumnDef<ArticleColumn>[] = [
  {
    accessorKey: "title",
    header: "Titulek",
  },
  {
    accessorKey: "createdAt",
    header: "Datum vytvoření",
    cell: ({ row }) => {
      return formatDateToDDMMYY(row.original.createdAt)
    },
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
