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
import ImageUpload from "@/components/ui/ImageUpload"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import AlertModal from "@/components/ui/modals/AlertModal"
import { useOrigin } from "@/hooks/useOrigin"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})
interface BillboardFormProps {
  initialData: Billboard | null
}
type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  })

  const origin = useOrigin()

  const title = initialData ? "Editovat" : "Přidat billboard"
  const description = initialData ? "Editovat billboard" : "Nový billboard"
  const postMessage = initialData
    ? "Billboard byl upraven"
    : "Billboard byl přidán"
  const titleButton = initialData ? "Uložit změnz" : "Přidat billboard"
  const action = initialData ? "Edit" : "Přidat"

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast({
        title: "Updating store",
        description: "Store name has been updated",
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
        `/api/${params.storeId}/billboards/${params.billboardId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast({
        title: "Deleting billboard",
        description: "Billboards has been deleted",
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
            Delete Billboard
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Billboard label"
                      {...field}
                    />
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

export default BillboardForm
