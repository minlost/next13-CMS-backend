"use client"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { FC } from "react"
import { UseFormReturn } from "react-hook-form"
import { ProductColumn } from "./Columns"

interface EditFormProductProps {
  data: ProductColumn
  isLoading: boolean
  form: UseFormReturn<
    {
      quantity: any
      price: any
    },
    any,
    undefined
  >
  onSubmit: (data: any) => void
}

const EditFormProduct: FC<EditFormProductProps> = ({
  data,
  isLoading,
  form,
  onSubmit,
}) => {
  const titleButton = "Save Changes"
  const action = {
    edit: "Edit",
    delete: "Delete",
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
                    // placeholder={
                    //   data?.quantity.toString() || "Quantity is missing"
                    // }
                    {...field}
                    type="number"
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
                    // placeholder={
                    //   (data.quantity * data.price).toString() ||
                    //   "Price is missing"
                    // }
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 justify-center">
          <Button disabled={isLoading} type="submit">
            {action.edit}
          </Button>
          <Button disabled={isLoading} type="submit" className="bg-red-500">
            {action.delete}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditFormProduct
