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

export interface IArticleCommentData {
  result: [
    {
      id: number;
      title: string;
      content: string;
      writerID: string;
      date: string;
      nickname: string;
      page: string;
      postID?: string;
      text?: string;
    }
  ];
  logined: boolean;
}

export interface IArticle {
  page: string;
  explain?: string;
  data?: IArticleCommentData[];
}

export interface IPage {
  page: string;
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
