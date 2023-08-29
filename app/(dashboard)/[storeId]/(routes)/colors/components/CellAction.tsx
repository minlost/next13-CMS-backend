"use cleint"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu"
import AlertModal from "@/components/ui/modals/AlertModal"
import { useToast } from "@/hooks/useToast"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import axios from "axios"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { ColorColumn } from "./Columns"

interface CellActionProps {
  data: ColorColumn
}

const CellAction: FC<CellActionProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    })
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(
        `/api/${params.storeId}/colors/${data.id}`
      )
      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast({
        title: "Deleting colors",
        description: "Color has been deleted",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong, please try again later",
      })
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only"> Open menu </span>
            <MoreHorizontal className="h-5 w-5 p-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akce</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4 " />
            Zkopárovat ID do schránky
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4 " />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} disabled={isLoading}>
            <Trash className="mr-2 h-4 w-4 " />
            Smazat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
