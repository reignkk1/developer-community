export interface IArticleInfo {
  result: [
    {
      id: number;
      title: string;
      content: string;
      writerID: number;
      date: string;
      hits: number;
      nickname: string;
    }
  ];
  writerMatch: boolean;
}

export interface IArticleData {
  id: number;
  title: string;
  content: string;
  writerID: string;
  date: string;
  nickname: string;
  page: string;
}

export interface IComment {
  id: number;
  date: string;
  text: string;
  postID: number;
  writerID: number;
  page: string;
  nickname: string;
}

export interface IArticle {
  page: string;
  explain?: string;
  data?: IArticleData[];
}

export interface IPage {
  page: string;
}

export interface IPagesTitle {
  ImgeSrc: string;
  name: string;
  explain: string;
}

export interface IUserData {
  userID: string;
  password: string;
  email: string;
  name: string;
  nickname: string;
  create_time: string;
  manager: number;
}
