export enum ETaskTypes {
  ANIMATION = 'ANIMATION',
  PARTICLE_SYSTEM = 'PARTICLE_SYSTEM'
}

export interface ITask {
  id: number;
  title: string;
  description: string;
}

export interface ITaskCreate {
  title: string;
  description: string;
  parentLink?: string;
  type?: ETaskTypes;
  personId?: number;
  enemyId?: number;
}

export interface ITaskUpdate {
  title: string;
  description: string;
}
