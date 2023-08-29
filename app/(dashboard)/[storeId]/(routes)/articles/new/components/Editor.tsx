"use client"

import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { z } from "zod"

import { PostCreationRequest, PostValidator } from "@/lib/validators/post"
import axios from "axios"

import { toast } from "@/hooks/useToast"
import "@/styles/editor.css"

type FormData = z.infer<typeof PostValidator>

export const Editor = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      content: null,
    },
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const params = useParams()

  const createPost = async (title: string, content: any) => {
    const payload = { title, content, params }
    try {
      const { data } = await axios.post(
        `/api/${params.storeId}/articles/`,
        payload
      )
      toast({
        description: "Váš příspěvek byl úspěšně publikován",
      })
      console.log(data)
    } catch (error) {
      toast({
        title: "Něco se pokazilo.",
        description: "Zkuste to prosím znovu.",
        variant: "destructive",
      })
    }
  }

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Napište něco...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },

          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: "Něco se pokazilo.",
          variant: "destructive",
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
    }

    createPost(data.title, blocks)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register("title")

  return (
    <div className=" w-full">
      <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 ">
        <form
          id="subreddit-post-form"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="prose prose-stone dark:prose-invert w-full">
            <TextareaAutosize
              ref={(e) => {
                titleRef(e)
                // @ts-ignore
                _titleRef.current = e
              }}
              {...rest}
              placeholder="Title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div id="editor" className=" w-full  " />
            <p className="text-sm text-gray-500">
              Použij{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              pro otevření nástrojové lišty
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
