import { Query } from '@/queries/query'
import { ITask, ITaskCreate, ITaskUpdate } from '@/interfaces/task'

export default abstract class QueryTasks {
  private static query = new Query('tasks');

  public static async $get (id: number): Promise<ITask> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<ITask[]> {
    return this.query.$getAll()
  }

  public static async $post (params: ITaskCreate): Promise<ITask> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: ITaskUpdate): Promise<ITask> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
