export interface IWorld {
  id: number;
  age: number;
  name: string;
  description: string;
}

export interface IWorldCreate {
  name: string;
  description: string;
}

export interface IWorldUpdate {
  name?: string;
  description?: string;
}
