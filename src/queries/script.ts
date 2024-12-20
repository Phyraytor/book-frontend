import { Query } from '@/queries/query'
import { IScript, IScriptCreate, IScriptUpdate } from '@/interfaces/script'

export default abstract class QueryScripts {
  private static query = new Query('scripts');

  public static async $get (id: number): Promise<IScript> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<IScript[]> {
    return this.query.$getAll()
  }

  public static async $post (params: IScriptCreate): Promise<IScript> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IScriptUpdate): Promise<IScript> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
