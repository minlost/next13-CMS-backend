"use client"

import Heading from "@/components/heading/Heading"
import { Button } from "@/components/ui/Button"
import { DataTableWithoutFilter } from "@/components/ui/DataTableWithoutFilter"
import { Separator } from "@/components/ui/Separator"
import AlertModal from "@/components/ui/modals/AlertModal"
import { useOrigin } from "@/hooks/useOrigin"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Address, Order } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { columns } from "./Columns"
import OrderDetailInfo from "./OrderDetailInfo"
import OrderDetailAddress from "./OrderDetailAddress"

interface OrderDetailProps {
  initialData: {
    id: string
    storeId: string
    isPaid: boolean
    phone: string
    address: Address[]
    email: string
    createdAt: Date
    updatedAt: Date
  }
}

const OrderDetail: FC<OrderDetailProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()

  const origin = useOrigin()
  const [data, setData] = useState([])
  const odersInfo = async () => {
    const { data } = await axios.get(
      `/api/${params.storeId}/orders/${params.orderId}`
    )
    const price = await data.orderItems[0].price
    setData(data.orderItems)
  }

  useEffect(() => {
    odersInfo()
  }, [])

  const title = `Order id: ${initialData?.id}`

  const titleButton = "Save Changes"
  const action = "edit"

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(
        `/api/${params.storeId}/orders/${params.orderId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/orders`)
      toast({
        title: "Smazání objednávky",
        description: "Objednávka byla smazána",
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
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={`Tato objednávka ${
            initialData?.isPaid ? "zaplacena" : "není zaplacena"
          }`}
          className={`${
            initialData?.isPaid ? "text-green-500" : "text-red-500"
          }`}
        />
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Smazat objednávku
          </Button>
        )}
      </div>
      <Separator />
      <div className="flex gap-5 flex-col lg:flex-row">
        <OrderDetailInfo initialData={initialData} />
        <OrderDetailAddress address={initialData.address[0]} />
      </div>
      <Separator />
      <DataTableWithoutFilter columns={columns} data={data} />

      <Separator />
    </>
  )
}

export default OrderDetail
