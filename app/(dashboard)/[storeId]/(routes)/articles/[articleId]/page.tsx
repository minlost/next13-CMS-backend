import { db } from "@/lib/client/prismaDb"
import CategoryForm from "./components/ArticleForm"
import { EditorUpdate } from "./components/EditorUpdate"
import { Button } from "@/components/ui/Button"

interface ArticlePageProps {
  params: {
    storeId: string
    articleId: string
  }
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const article = await db.article.findFirst({
    where: {
      storeId: params.storeId,
      id: params.articleId,
    },
  })
  console.log(article)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <EditorUpdate article={article} />
      </div>
      <Button type="submit" className="mx-auto" form="subreddit-post-form">
        Upravit
      </Button>
    </div>
  )
}

export default ArticlePage
