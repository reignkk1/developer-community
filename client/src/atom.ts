import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: loginPersist } = recoilPersist({
  key: "logined",
  storage: sessionStorage,
});

const { persistAtom: avartarPersist } = recoilPersist({
  key: "avartar",
  storage: sessionStorage,
});

// 로그인 상태
export const logined = atom({
  key: "logined",
  default: false,
  effects_UNSTABLE: [loginPersist],
});

// Header Avartar 클릭시 메뉴 상태
export const isOpendAvartarMenu = atom({
  key: "avartarMenu",
  default: false,
});

// 로그인 한 유저의 AvartarUrl
export const avartarUrl = atom({
  key: "avartarUrl",
  default: "",
  effects_UNSTABLE: [avartarPersist],
});
