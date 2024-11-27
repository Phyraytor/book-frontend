import { Query } from '@/queries/query'
import { IPerson, IPersonCreate, IPersonFind, IPersonUpdate } from '@/interfaces/person'

export default abstract class QueryPersons {
  private static query = new Query('persons');

  public static async $get (id: number): Promise<IPerson> {
    return this.query.$get(id)
  }

  public static async $getAll (params: IPersonFind): Promise<IPerson[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: IPersonCreate): Promise<IPerson> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IPersonUpdate): Promise<IPerson> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
