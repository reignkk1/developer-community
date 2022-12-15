export interface IData {
  id: number;
  title: string;
  content: string;
  writeID: number;
  date: string;
  hits: number;
}

export interface IArticle {
  type: string;
  name: string;
  href: string;
  data?: IData[];
}
