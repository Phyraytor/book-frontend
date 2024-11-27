export interface IEnemy {
  id: number;
  name: string;
  description: string;
  imagePath?: string;
  gameId?: number;
}

export interface IEnemyFind {
  gameId?: number;
}

export interface IEnemyCreate {
  name: string;
  description: string;
  gameId: number;
}

export interface IEnemyUpdate {
  name?: string;
  description?: string;
}
