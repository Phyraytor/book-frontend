import { ISound } from '@/interfaces/sound'

export interface ISubject {
  id: number;
  sound: ISound;
  name: string;
  description: string;
}

export interface ISubjectFind {
  gameId: number;
}

export interface ISubjectCreate {

}

export interface ISubjectUpdate {
  name?: string;
  description?: string;
}
