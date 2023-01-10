import { atom } from "recoil";

export const loginUserInfo = atom({
  key: "loginUser",
  default: [],
});
export const logined = atom({
  key: "logined",
  default: false,
});
