export interface IComment {
  id: number;
  text: string;
  date: number;
}

export interface IFullImage {
  id: number;
  url: string;
  comments: IComment[];
}

export interface IThumbnails {
  id: number;
  url: string;
}