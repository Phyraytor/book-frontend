export interface ILanguage {
  id: number;
  name: string;
}

export interface ILanguageFind {
  gameId?: number;
}

export interface ILanguageCreate {
  name: string;
  gameId: number;
}

export interface ILanguageUpdate {
  name?: string;
}
