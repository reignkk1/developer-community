export interface IPost {
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

export interface IPage {
  page: 'notice' | 'tech' | 'life' | 'guest-book' | 'search';
}

export interface IUser {
  id: number;
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
