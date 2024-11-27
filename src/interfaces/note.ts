import { ISound } from '@/interfaces/sound'
import { ILanguage } from '@/interfaces/language'

export interface INote {
  id: number;
  title: string;
  content: string;
  sound: ISound;
  language: ILanguage;
}

export interface INoteCreate {
  content: string;
  messageId: number;
  languageId: number;
}

export interface INoteUpdate {
  content?: string;
}
