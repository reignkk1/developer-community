import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: loginPersist } = recoilPersist({
  key: "logined",
  storage: sessionStorage,
});

// 로그인 유무
export const logined = atom({
  key: "logined",
  default: false,
  effects_UNSTABLE: [loginPersist],
});

// Avartar Click Menu State

export const isOpendAvartarMenu = atom({
  key: "avartarMenu",
  default: false,
});
