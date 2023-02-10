import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "logined",
  storage: sessionStorage,
});

export const logined = atom({
  key: "logined",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userID = atom({
  key: "userID",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
