import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: darkPersist } = recoilPersist({
  key: 'isDark',
  storage: localStorage,
});

// 다크모드 상태
export const DarkMode = atom({
  key: 'isDark',
  default: false,
  effects_UNSTABLE: [darkPersist],
});

// Header Avartar 클릭시 메뉴 상태
export const isOpendAvartarMenu = atom({
  key: 'avartarMenu',
  default: false,
});

// drawerMenuOpen 상태
export const isOpendDrawerMenu = atom({
  key: 'drawerMenu',
  default: false,
});
