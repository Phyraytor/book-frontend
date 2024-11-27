import { Query } from '@/queries/query'
import { ISpell, ISpellCreate, ISpellFind, ISpellUpdate } from '@/interfaces/spell'

export default abstract class QuerySpells {
  private static query = new Query('spells');

  public static async $get (id: number): Promise<ISpell> {
    return this.query.$get(id)
  }

  public static async $getAll (params: ISpellFind): Promise<ISpell[]> {
    return this.query.$getAll(params)
  }

  public static async $post (params: ISpellCreate): Promise<ISpell> {
    return this.query.$post(params)
  }

  public static async $patch (id: number, params: ISpellUpdate): Promise<ISpell> {
    return this.query.$patch(id, params)
  }

  public static async $delete (id: number): Promise<null> {
    return this.query.$delete(id)
  }
}
