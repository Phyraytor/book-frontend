import { Query } from '@/queries/query'
import { IMessage, IMessageCreate, IMessageUpdate } from '@/interfaces/message'

export default abstract class QueryMessages {
  private static query = new Query('messages');

  public static async $get (id: number): Promise<IMessage> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<IMessage[]> {
    return this.query.$getAll()
  }

  public static async $post (params: IMessageCreate): Promise<IMessage> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IMessageUpdate): Promise<IMessage> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
