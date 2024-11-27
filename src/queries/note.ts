import { Query } from '@/queries/query'
import { INote, INoteCreate, INoteUpdate } from '@/interfaces/note'

export default abstract class QueryNotes {
  private static query = new Query('notes');

  public static async $get (id: number): Promise<INote> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<INote[]> {
    return this.query.$getAll()
  }

  public static async $post (params: INoteCreate): Promise<INote> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: INoteUpdate): Promise<INote> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
