"use client"

import Heading from "@/components/heading/Heading"
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
import { Separator } from "@/components/ui/Separator"
import AlertModal from "@/components/ui/modals/AlertModal"
import { useOrigin } from "@/hooks/useOrigin"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1).regex(/^#/, {
    message: "Color value must start with #",
  }),
})
interface ColorFormProps {
  initialData: Color | null
}
type ColorFormValues = z.infer<typeof formSchema>

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  })

  const origin = useOrigin()

  const title = initialData ? "Editovat" : "Přidat bavu"
  const description = initialData ? "Upravit barvu" : "Nová barva"
  const postMessage = initialData
    ? "Color has been updated"
    : "Color has been added"
  const action = initialData ? "Editovat" : "Přidat"

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast({
        title: "Updating color",
        description: "Color name has been updated",
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
    }
  }

  const onDelete = async () => {
    console.log("delete")
    try {
      setIsLoading(true)
      const response = await axios.delete(
        `/api/${params.storeId}/colors/${params.colorId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast({
        title: "Deleting color",
        description: "colors has been deleted",
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete color
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Název</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hodnota</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={isLoading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="p-4 rounded-full border"
                        style={{
                          backgroundColor: field.value,
                        }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}

export default ColorForm
