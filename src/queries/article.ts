import { Query } from '@/queries/query'
import { IArticle, IArticleCreate, IArticleUpdate } from '@/interfaces/article'

export default abstract class QueryArticles {
  private static query = new Query('articles');

  public static async $get (id: number): Promise<IArticle> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<IArticle[]> {
    return this.query.$getAll()
  }

  public static async $post (params: IArticleCreate): Promise<IArticle> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IArticleUpdate): Promise<IArticle> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
