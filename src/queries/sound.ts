import { Query } from '@/queries/query'
import { ISound, ISoundCreate, ISoundUpdate } from '@/interfaces/sound'

export default abstract class QuerySounds {
  private static query = new Query('sounds');

  public static async $get (id: number): Promise<ISound> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<ISound[]> {
    return this.query.$getAll()
  }

  public static async $post (params: ISoundCreate): Promise<ISound> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: ISoundUpdate): Promise<ISound> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
