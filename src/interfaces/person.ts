export interface IPerson {
  id: number;
  name: string;
  description: string;
}

export interface IPersonCreate {
  name: string;
  description: string;
  gameId: number;
}

export interface IPersonFind {
  gameId?: number;
}

export interface IPersonUpdate {
  name?: string;
  description?: string;
}
