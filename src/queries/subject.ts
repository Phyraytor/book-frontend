import { Query } from '@/queries/query'
import { ISubject, ISubjectCreate, ISubjectFind, ISubjectUpdate } from '@/interfaces/subject'

export default abstract class QuerySubjects {
  private static query = new Query('subjects');

  public static async $get (id: number): Promise<ISubject> {
    return this.query.$get(id)
  }

  public static async $getAll (params: ISubjectFind): Promise<ISubject[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: ISubjectCreate): Promise<ISubject> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: ISubjectUpdate): Promise<ISubject> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
