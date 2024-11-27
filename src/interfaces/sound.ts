export interface ISound {
  id: number;
  name: string;
  description: string;
  path: string;
  link: string;
  author: string;
}

export interface ISoundCreate {
  name: string;
  description:string;
  planes: string;
  sources: string;
  notices: string;
  story: string;
}

export interface ISoundUpdate {
  link?: string;
  author?: string;
  description?: string;
  name?: string;
}
