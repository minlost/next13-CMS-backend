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
import { Address } from "@prisma/client"
import { FC } from "react"
import { UseFormReturn } from "react-hook-form"

interface EditFormAddressProps {
  initialData: Address | null
  isLoading: boolean
  form: UseFormReturn<
    {
      city: string
      country: string
      street: string
      zip: string
    },
    any,
    undefined
  >
  onSubmit: (data: any) => void
}

const EditFormAddress: FC<EditFormAddressProps> = ({
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder={initialData?.city || "Email is missing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder={initialData?.street || "Phone is missing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder={initialData?.country || "Phone is missing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder={initialData?.zip || "Phone is missing"}
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

export default EditFormAddress
