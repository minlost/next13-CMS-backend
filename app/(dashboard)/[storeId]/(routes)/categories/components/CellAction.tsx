"use cleint"

import { Button } from "@/components/ui/Button"
import { FC, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu"
import { useToast } from "@/hooks/useToast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import AlertModal from "@/components/ui/modals/AlertModal"
import { CategoryColumn } from "./Columns"

interface CellActionProps {
  data: CategoryColumn
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
        `/api/${params.storeId}/categories/${data.id}`
      )
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast({
        title: "Deleting categories",
        description: "Categories has been deleted",
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
            Zkopírovat ID do schránky
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4 " />
            Editovat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} disabled={isLoading}>
            <Trash className="mr-2 h-4 w-4 " />
            Smazaz
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
