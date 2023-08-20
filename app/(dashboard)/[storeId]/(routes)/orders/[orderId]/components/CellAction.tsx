"use cleint"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu"
import EditModal from "@/components/ui/modals/EditModal"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import axios from "axios"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ProductColumn } from "./Columns"
import EditFormProduct from "./EditFormProduct"
import { Input } from "@/components/ui/Input"

interface PorductActionProps {
  initialdata: ProductColumn
}

const CellAction: FC<PorductActionProps> = ({ initialdata }) => {
  const { toast } = useToast()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // const onDelete = async () => {
  //   try {
  //     setIsLoading(true)
  //     const response = await axios.delete(
  //       `/api/${params.storeId}/colors/${data.id}`
  //     )
  //     router.refresh()
  //     router.push(`/${params.storeId}/colors`)
  //     toast({
  //       title: "Deleting colors",
  //       description: "Color has been deleted",
  //       variant: "success",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       variant: "destructive",
  //       description: "Something went wrong, please try again later",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //     setOpen(false)
  //   }
  // }

  const formSchema = z.object({
    quantity: z.number(),
    price: z.number(),
  })

  type ProductDetailPropsValues = z.infer<typeof formSchema>

  const form = useForm<ProductDetailPropsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialdata,
      price: parseFloat(String(initialdata?.price)),
      quantity: parseFloat(String(initialdata?.price)),
    } || {
      quantity: 0,
      price: 0,
    },
  })
  const onSubmit = async (data: ProductDetailPropsValues) => {
    try {
      data.quantity = Number(data.quantity)
      data.price = Number(data.price)

      const response = await axios.patch(
        `/api/${params.storeId}/orders/${params.orderId}/product/${initialdata.product.id}`,
        data
      )
      window.location.reload()
      toast({
        title: "Product item has been updated",
        description: "Product item  has been deleted",
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
      <EditModal
        title="Edit Product"
        description="Edit product information"
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isLoading}
      >
        {/* <EditFormProduct
          form={form}
          data={initialdata}
          isLoading={isLoading}
          onSubmit={onSubmit}
        /> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 justify-center">
              <Button disabled={isLoading} type="submit">
                edit
              </Button>
              <Button disabled={isLoading} type="submit" className="bg-red-500">
                delete
              </Button>
            </div>
          </form>
        </Form>
      </EditModal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only"> Open menu </span>
            <MoreHorizontal className="h-5 w-5 p-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)} disabled={isLoading}>
            <Edit className="mr-2 h-4 w-4 " />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} disabled={isLoading}>
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
