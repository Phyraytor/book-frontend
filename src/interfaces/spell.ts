import { ISound } from '@/interfaces/sound'

export interface ISpell {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  linkAnimation: string;
  linkParticleSystem: string;
  sounds: ISound[];
}

export interface ISpellFind {
  personId?: number;
  enemyId?: number;
  subjectId?: number;
}

export interface ISpellCreate {
  name: string;
  description: string;
  personId?: number;
  enemyId?: number;
  subjectId?: number;
}

export interface ISpellUpdate {
  name?: string;
  description?: string;
  linkAnimation?: string;
  linkParticleSystem?: string;
}
