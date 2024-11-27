import { Query } from '@/queries/query'
import { IEnemy, IEnemyCreate, IEnemyFind, IEnemyUpdate } from '@/interfaces/enemy'

export default abstract class QueryEnemies {
  private static query = new Query('enemies');

  public static async $get (id: number): Promise<IEnemy> {
    return this.query.$get(id)
  }

  public static async $getAll (params: IEnemyFind): Promise<IEnemy[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: IEnemyCreate): Promise<IEnemy> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IEnemyUpdate): Promise<IEnemy> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
