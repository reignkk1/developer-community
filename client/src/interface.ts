export interface IArticleInfo {
  user: [
    {
      id: number;
      title: string;
      content: string;
      writeID: number;
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
  ImgeSrc: string;
  name: string;
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
}

export const props = {
  ImgeSrc: {
    notice: "https://okky.kr/notice.svg",
    question: "https://okky.kr/questions.svg",
    life: "https://okky.kr/community.svg",
    quote: "https://okky.kr/knowledge.svg",
  },
  page: {
    notice: "notice",
    question: "question",
    life: "life",
    quote: "quote",
  },
};
