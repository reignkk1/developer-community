export interface SectionData {
  path: string;
  title: string;
  description: string;
}

export interface SectionRouteItem {
  section: string;
  title: string;
  header: {
    title: string;
    description: string;
  };
}

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

export interface ISection {
  section:
    | 'notice'
    | 'tech'
    | 'life'
    | 'guest-book'
    | 'search'
    | 'posts'
    | 'comments'
    | string
    | undefined;
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
  page: string;
  nickname: string;
  avartar: string;
  parentID: number;
}

export interface ILoginUserProp {
  loginUser: IUser | undefined;
}

export interface IActivityPage extends ISection {
  userId?: string;
}
