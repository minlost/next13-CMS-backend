"use client"

import { Button } from "@/components/ui/Button"
import { FC, useState } from "react"
import { BillboardColumn } from "./Columns"
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

interface CellActionProps {
  data: BillboardColumn
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
      title: "Zkopírovat",
      description: "Id bylo zkopírováno do schránky",
    })
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(
        `/api/${params.storeId}/billboards/${data.id}`
      )
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast({
        title: "Smazat billboard",
        description: "Billboard byl úspěšně smazán",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Něco se pokazilo, zkuste to prosím znovu.",
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
            <span className="sr-only"> Otevřít menu </span>
            <MoreHorizontal className="h-5 w-5 p-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akce</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4 " />
            Kopírovat ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4 " />
            Editovat
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
