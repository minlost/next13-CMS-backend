import { db } from "@/lib/client/prismaDb"

import ArticleClient from "./components/ArticleClient"

interface ArticlesPageProps {
  params: {
    storeId: string
  }
}

const ArticlesPage = async ({ params }: ArticlesPageProps) => {
  const articles = await db.article.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ArticleClient data={articles} />
      </div>
      <div className="flex flex-col items-start gap-6 w-full"></div>
    </div>
  )
}

export default ArticlesPage
