"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStoreModal } from "@/hooks/useStoreModal"
import Modal from "../Modal"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form"
import { Input } from "../Input"
import { Button } from "../Button"
import { formSchema } from "@/lib/validators/modalValidator"
import { useState } from "react"
import axios, { Axios, AxiosError } from "axios"
import { useToast } from "@/hooks/useToast"

export const StoreModal = () => {
  const storeModal = useStoreModal()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/stores", values)
      toast({
        title: "Success",
        description: "Projekt vytvořen",
        variant: "success",
      })
      window.location.assign(`/${response.data.id}`)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Nepodařilo se přidat projekt",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        isOpen={storeModal.isOpen}
        description="Test Desc"
        onClose={storeModal.onClose}
        title="Title"
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Name of project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-center">
                  <Button
                    disabled={isLoading}
                    variant={"destructive"}
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}
