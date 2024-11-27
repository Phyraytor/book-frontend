import { Query } from '@/queries/query'
import { IStep, IStepCreate, IStepFind, IStepUpdate } from '@/interfaces/step'

export default abstract class QuerySteps {
  private static query = new Query('steps');

  public static async $get (id: number): Promise<IStep> {
    return this.query.$get(id)
  }

  public static async $getAll (params: IStepFind): Promise<IStep[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: IStepCreate): Promise<IStep> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IStepUpdate): Promise<IStep> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
