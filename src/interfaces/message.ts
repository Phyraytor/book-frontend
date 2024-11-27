import { INote } from '@/interfaces/note'

export interface IMessage {
  id: number;
  name: string;
  description: string;
  notes: INote[];
}

export interface IMessageCreate {
  name: string;
  stepId: number;
}

export interface IMessageUpdate {
  name?: string;
  description?: string;
}
