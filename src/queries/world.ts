import { Query } from '@/queries/query'
import { IWorld, IWorldCreate, IWorldUpdate } from '@/interfaces/world'

export default abstract class QueryWorlds {
  private static query = new Query('worlds');

  public static async $get (id: number): Promise<IWorld> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<IWorld[]> {
    return this.query.$getAll()
  }

  public static async $post (params: IWorldCreate): Promise<IWorld> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IWorldUpdate): Promise<IWorld> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
