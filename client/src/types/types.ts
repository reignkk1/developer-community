export interface IPost {
  id: number;
  title: string;
  content: string;
  writerID: number;
  date: string;
  nickname: string;
  page: string;
  postID?: string;
  text?: string;
  avartar: string;
}

export interface IPage {
  page:
    | 'notice'
    | 'tech'
    | 'life'
    | 'guest-book'
    | 'search'
    | 'posts'
    | 'comments'
    | string;
}

export interface ISection {
  section: 'notice' | 'life' | 'tech' | 'guest-book' | undefined;
}

export interface IUser {
  id: number;
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
  page: 'notice' | 'tech' | 'life' | 'guest-book' | undefined;
  nickname: string;
  avartar: string;
  parentID: number;
}

export interface ILoginUserProp {
  loginUser: IUser | undefined;
}

export interface IActivityPage {
  page: 'posts' | 'comments';
  userId?: string;
}
