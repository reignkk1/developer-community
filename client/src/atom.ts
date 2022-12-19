import { atom } from "recoil";
import { IData } from "./interface";

export const noticeGet = atom<IData[]>({
  key: "notice",
  default: [],
});
