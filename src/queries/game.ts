import { Query } from '@/queries/query'
import { IGameFind, IGame, IGameCreate, IGameUpdate } from '@/interfaces/games'

export default abstract class QueryGames {
  private static query = new Query('games');

  public static async $get (id: number): Promise<IGame> {
    return this.query.$get(id)
  }

  public static async $getAll (params: IGameFind): Promise<IGame[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: IGameCreate): Promise<IGame> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IGameUpdate): Promise<IGame> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
