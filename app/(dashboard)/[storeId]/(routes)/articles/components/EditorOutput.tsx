"use client"

import CustomCodeRenderer from "./renderers/CustomCodeRenderer"
import { FC } from "react"
import dynamic from "next/dynamic"

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
  title?: string
}

const renderers = {
  code: CustomCodeRenderer,
}

const style = {
  paragraph: {
    fontSize: ".875rem",
    lineHeight: "1.25rem",
  },
}

const EditorOutput: FC<EditorOutputProps> = ({ content, title }) => {
  return (
    <div className=" w-full px-16 border ">
      <h2 className="text-3xl font-semibold ">{title}</h2>
      {/* @ts-expect-error */}
      <Output style={style} renderers={renderers} data={content} />
    </div>
  )
}

export default EditorOutput
