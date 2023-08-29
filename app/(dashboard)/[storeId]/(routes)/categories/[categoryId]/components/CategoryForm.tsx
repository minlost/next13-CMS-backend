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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/Select"
import { useOrigin } from "@/hooks/useOrigin"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import { SelectValue } from "@radix-ui/react-select"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})
interface CategoryFormProps {
  initialData: Category | null
  billboards: Billboard[]
}
type CategoryFormValues = z.infer<typeof formSchema>

const CategoryForm: FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  })

  const origin = useOrigin()

  const title = initialData ? "Editovat" : "Přidat kategorii"
  const description = initialData ? "Edituj kategorii" : "Nová kategorie"
  const postMessage = initialData
    ? "Category has been updated"
    : "Category has been added"
  const titleButton = initialData ? "Uložit změny" : "Přidat kategorii"
  const action = initialData ? "Editovat" : "Přidat"

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/categories`)
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
        `/api/${params.storeId}/categories/${params.categoryId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast({
        title: "Deleting category",
        description: "Category has been deleted",
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
            Smazat kategorii
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem
                          key={billboard.id}
                          value={billboard.id}
                          defaultValue={field.value}
                        >
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm
