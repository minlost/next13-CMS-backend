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
import { Order } from "@prisma/client"
import { FC } from "react"
import { UseFormReturn } from "react-hook-form"

interface EditFormCustomerProps {
  initialData: Order | null
  isLoading: boolean
  form: UseFormReturn<
    {
      phone: string
      email: string
    },
    any,
    undefined
  >
  onSubmit: (data: any) => void
}

const EditFormCustomer: FC<EditFormCustomerProps> = ({
  initialData,
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder={initialData?.email || "Email is missing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder={initialData?.phone || "Phone is missing"}
                    {...field}
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

export default EditFormCustomer
