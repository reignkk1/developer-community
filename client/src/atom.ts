import axios from "axios";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

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

interface ILoginUserInfoGet {
  avartar: string;
  create_time: string;
  email: string;
  id: number;
  manager: number;
  name: string;
  nickname: string;
  password: string;
  userID: string;
}

// 로그인 한 유저의 정보 fetch
export const loginUserInfoGet = selector<ILoginUserInfoGet | undefined>({
  key: "loginUserInfo",
  get: async () => await (await axios.get("/user/login-info")).data,
});
