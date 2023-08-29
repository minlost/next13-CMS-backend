"use client"

import * as z from "zod"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/heading/Heading"
import { Button } from "@/components/ui/Button"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { FC, use, useState } from "react"
import { Separator } from "@/components/ui/Separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/hooks/useToast"
import axios from "axios"
import AlertModal from "@/components/ui/modals/AlertModal"
import ApiAlert from "@/components/ui/ApiAlert"
import { useOrigin } from "@/hooks/useOrigin"

interface SettingFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(3),
})

type SettingFormValues = z.infer<typeof formSchema>

const SettingForm: FC<SettingFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
    },
  })

  const origin = useOrigin()

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setIsLoading(true)

      const response = await axios.patch(`/api/stores/${params.storeId}`, data)

      router.refresh()
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
    try {
      setIsLoading(true)
      const response = await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/dashboard")
      toast({
        title: "Deleting store",
        description: "Store has been deleted",
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
        <Heading title="Settings" description="Spravujte nastavení zde" />
        <Button
          disabled={isLoading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4 mr-2" />
          Smazat Eshop
        </Button>
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
                  <FormLabel>Jméno</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            Uložit nastavení
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  )
}

export default SettingForm
