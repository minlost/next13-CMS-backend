"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type CarouselColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<CarouselColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
