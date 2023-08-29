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
import { Order } from "@prisma/client"
import axios from "axios"
import { format } from "date-fns"
import { Edit, Mail, Phone } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import EditFormCustomer from "./EditFormCustomer"

interface OrderDetailInfoProps {
  initialData: Order | null
}

const OrderDetailInfo: FC<OrderDetailInfoProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const formSchema = z.object({
    email: z.string().min(1),
    phone: z.string().min(9),
  })
  const onSubmit = async (data: OrderDetailPropsValues) => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/${params.storeId}/orders/${params.orderId}`,
        data
      )
      router.refresh()
      toast({
        title: "Objednávka upravena",
        description: "Objednávka byla upravena",
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

  type OrderDetailPropsValues = z.infer<typeof formSchema>

  const form = useForm<OrderDetailPropsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      email: "",
      phone: "",
    },
  })

  return (
    <>
      <EditModal
        title="Edituj zákazníka"
        description="Edituj zákazníkovi údaje"
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isLoading}
      >
        <EditFormCustomer
          initialData={initialData}
          isLoading={isLoading}
          form={form}
          onSubmit={onSubmit}
        />
      </EditModal>

      <Card className="w-[500px] relative">
        <CardHeader>
          <CardTitle>Kontaktní údaje</CardTitle>
          <CardDescription>Kontaktní údaje o zakazníkovi</CardDescription>
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
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Created at: </p>

                <p className="text-sm text-muted-foreground">
                  {`${
                    initialData
                      ? format(initialData?.createdAt, "dd/MM/yyyy")
                      : null
                  }`}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Upadated at:{" "}
                </p>

                <p className="text-sm text-muted-foreground">
                  {`${
                    initialData
                      ? format(initialData?.updatedAt, "dd/MM/yyyy")
                      : null
                  }`}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <Mail className="h-4 w-4" />
              <p className="text-sm font-medium leading-none">Mail: </p>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {initialData?.email || "No email"}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <Phone className="h-4 w-4" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Phone: </p>

                <p className="text-sm text-muted-foreground">
                  {initialData?.phone || "No phone"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default OrderDetailInfo
