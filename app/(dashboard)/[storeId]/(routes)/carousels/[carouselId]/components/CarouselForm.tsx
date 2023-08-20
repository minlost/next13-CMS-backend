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
import { Carousel } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  label: z.string(),
  imageUrl: z.string().min(1),
  link: z.string().min(1),
})
interface CarouselFormProps {
  initialData: Carousel | null
}
type CarouselFormValues = z.infer<typeof formSchema>

const CarouselForm: FC<CarouselFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const form = useForm<CarouselFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: " ",
      imageUrl: "",
      link: "",
    },
  })

  const origin = useOrigin()

  const title = initialData ? "Edit Corusel" : "Add Corusel"
  const description = initialData ? "Edit your Corusel" : "Add new Corusel"
  const postMessage = initialData
    ? "Corusel has been updated"
    : "Corusel has been added"
  const titleButton = initialData ? "Save Changes" : "Add Corusel"
  const action = initialData ? "edit" : "add"

  const onSubmit = async (data: CarouselFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/carousels/${params.carouselId}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeId}/carousels`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/carousels`)
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
        `/api/${params.storeId}/carousels/${params.corouseldId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/carousels`)
      toast({
        title: "Deleting carousel",
        description: "carousels has been deleted",
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
            Delete Carousel
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
                  <FormLabel className="inline-flex gap-2 items-center">
                    Label{" "}
                    <p className="text-neutral-500 text-[0.6rem]">Optional</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Carousel label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="https://example.com"
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

export default CarouselForm
