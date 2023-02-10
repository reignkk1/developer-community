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

export interface IData {
  id: number;
  title: string;
  content: string;
  writerID: string;
  date: string;
  hits: number;
  nickname: string;
}

export interface IArticle {
  ImgeSrc: string;
  name: string;
  page: string;
  explain?: string;
  data?: IData[];
}

export interface IPage {
  page: string;
}

export interface IPagesTitle {
  ImgeSrc: string;
  name: string;
  explain: string;
}

export const props = {
  name: {
    notice: "공지사항",
    question: "Q & A",
    life: "사는얘기",
    quote: "오늘의 명언",
  },
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
