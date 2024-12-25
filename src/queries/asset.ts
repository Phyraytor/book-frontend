import { Query } from '@/queries/query'
import { IAsset, IAssetCreate, IAssetUpdate } from '@/interfaces/asset'

export default abstract class QueryAssets {
  private static query = new Query('assets');

  public static async $get (id: number): Promise<IAsset> {
    return this.query.$get(id)
  }

  public static async $getAll (): Promise<IAsset[]> {
    return this.query.$getAll()
  }

  public static async $post (params: IAssetCreate): Promise<IAsset> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: IAssetUpdate): Promise<IAsset> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
