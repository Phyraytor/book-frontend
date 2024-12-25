export interface IAsset {
  id: number;
  name: string;
  description: string;
  link: string;
  imagePath: string;
}

export interface IAssetCreate {
  name: string;
  description: string;
  link: string;
}

export interface IAssetUpdate {
  name?: string;
  description?: string;
  link?: string;
  imagePath?: string;
}
