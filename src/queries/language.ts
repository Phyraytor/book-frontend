import { Query } from '@/queries/query'
import { ILanguage, ILanguageCreate, ILanguageFind, ILanguageUpdate } from '@/interfaces/language'

export default abstract class QueryLanguages {
  private static query = new Query('languages');

  public static async $get (id: number): Promise<ILanguage> {
    return this.query.$get(id)
  }

  public static async $getAll (params: ILanguageFind): Promise<ILanguage[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: ILanguageCreate): Promise<ILanguage> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: ILanguageUpdate): Promise<ILanguage> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
