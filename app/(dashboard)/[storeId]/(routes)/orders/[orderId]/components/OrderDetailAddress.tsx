"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import EditModal from "@/components/ui/modals/EditModal"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Address } from "@prisma/client"
import axios from "axios"
import { format } from "date-fns"
import { Edit, Flag, Globe, StretchHorizontal } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import EditFormCustomer from "./EditFormCustomer"
import EditFormAddress from "./EditFormAddress"
import { Castle } from "lucide-react"

interface OrderDetailAddressProps {
  address: Address | null
}

const OrderDetailAddress: FC<OrderDetailAddressProps> = ({ address }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const formSchema = z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    street: z.string().min(1),
    zip: z.string().min(1),
  })
  const onSubmit = async (data: OrderDetailAddressPropsValues) => {
    console.log(data)
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/${params.storeId}/orders/${params.orderId}/address`,
        data
      )
      router.refresh()
      toast({
        title: "Order has been updated",
        description: "Order has been deleted",
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

  type OrderDetailAddressPropsValues = z.infer<typeof formSchema>

  const form = useForm<OrderDetailAddressPropsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: address || {
      city: "",
      country: "",
      street: "",
      zip: "",
    },
  })

  return (
    <>
      <EditModal
        title="Edit adress"
        description="Edit address"
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isLoading}
      >
        <EditFormAddress
          initialData={address}
          isLoading={isLoading}
          form={form}
          onSubmit={onSubmit}
        />
      </EditModal>

      <Card className="w-[500px] relative">
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>This is address</CardDescription>
        </CardHeader>
        <CardContent>
          <Edit
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setOpen(true)
            }}
          />{" "}
          <div className="grid grid-cols-2">
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <Castle className="h-4 w-4" />{" "}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">City: </p>

                <p className="text-sm text-muted-foreground">
                  {address?.city || "No street"}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <StretchHorizontal className="h-4 w-4" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Street: </p>

                <p className="text-sm text-muted-foreground">
                  {address?.street || "No street"}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <Flag className="w-4 h-4" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Zip: </p>

                <p className="text-sm text-muted-foreground">
                  {address?.zip || "No Zip Code"}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <Globe className="w-4 h-4" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Country: </p>

                <p className="text-sm text-muted-foreground">
                  {address?.country || "No Country"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default OrderDetailAddress
