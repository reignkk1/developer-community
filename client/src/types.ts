export interface IArticleCommentData {
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
