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
      avartar: string;
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
      avartar: string;
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
  avartar: string;
}

export interface IComment {
  id: number;
  date: string;
  text: string;
  postID: number;
  writerID: number;
  page: string;
  nickname: string;
  avartar: string;
  parentID: number;
}
