import { ISound } from '@/interfaces/sound'

export interface IStep {
  id: number;
  orderBy: number;
  name: string;
  description: string;
  imagePath: string;
  sounds: ISound[];
}

export interface IStepFind {
  gameId?: number;
}

export interface IStepCreate {
  name: string;
  description: string;
  gameId: number;
}

export interface IStepUpdate {
  name?: string;
  description?: string;
  orderBy?: number;
}
