import React from "react"
import EditorClient from "./components/EditorClient"

const NewArticle = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col items-start gap-6 w-full">
          <EditorClient />
        </div>
      </div>
    </div>
  )
}

export default NewArticle
