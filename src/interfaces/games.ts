export interface IGame {
  id: number;
  name: string;
  description: string;
  planes: string;
  sources: string;
  story: string;
  notices: string;
  isMobile?: boolean;
  isOnline?: boolean;
  age?: number;
  orderBy: number;
}

export interface IGameFind {
  worldId?: number;
}

export interface IGameCreate {
  planes: string;
  sources: string;
  notices: string;
  story: string;
  name: string;
  description: string;
  worldId: number;
}

export interface IGameUpdate {
  name?: string;
  description?: string;
  planes?: string;
  sources?: string;
  story?: string;
  notices?: string;
  isMobile?: boolean;
  isOnline?: boolean;
  age?: number;
  orderBy?: number;
}
