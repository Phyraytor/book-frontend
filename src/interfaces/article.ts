export interface IArticle {
  id: number;
  title: string;
  description: string;
}

export interface IArticleCreate {
  title: string;
  description: string;
}

export interface IArticleUpdate {
  title?: string;
  description?: string;
}
