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

const { persistAtom: darkPersist } = recoilPersist({
  key: "isDark",
  storage: localStorage,
});

// 다크모드 상태
export const DarkMode = atom({
  key: "isDark",
  default: false,
  effects_UNSTABLE: [darkPersist],
});

// 로그인 상태
export const logined = atom({
  key: "logined",
  default: false,
  effects_UNSTABLE: [loginPersist],
});

// 로그인 한 유저의 AvartarUrl
export const avartarUrl = atom({
  key: "avartarUrl",
  default: "",
  effects_UNSTABLE: [avartarPersist],
});

// Header Avartar 클릭시 메뉴 상태
export const isOpendAvartarMenu = atom({
  key: "avartarMenu",
  default: false,
});

// drawerMenuOpen 상태
export const isOpendDrawerMenu = atom({
  key: "drawerMenu",
  default: false,
});
