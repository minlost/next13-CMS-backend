"use client"

import React from "react"
import { Editor } from "./Editor"
import { Button } from "@/components/ui/Button"

const EditorClient = () => {
  return (
    <>
      <Editor />

      <div className="w-full flex justify-end">
        <Button type="submit" className="mx-auto" form="subreddit-post-form">
          Odeslat
        </Button>
      </div>
    </>
  )
}

export default EditorClient
