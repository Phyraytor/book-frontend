import { ISound } from '@/interfaces/sound'

export interface ISpell {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  linkAnimation: string;
  linkParticleSystem: string;
  sound: ISound;
}

export interface ISpellFind {
  gameId?: number;
}

export interface ISpellCreate {
  name: string;
  description: string;
  gameId: number;
}

export interface ISpellUpdate {
  name?: string;
  description?: string;
  linkAnimation?: string;
  linkParticleSystem?: string;
}
