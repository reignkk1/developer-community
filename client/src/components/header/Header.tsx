import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

// File
import { logined, isOpendDrawerMenu } from "../../atom";
import AvartarClickMenu from "./avartarClickMenu/AvartarMenu";
import LoginSignUpBtn from "./loginSignUpButton/Buttons";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import SearchBar from "./search/Search";
import { HeaderBox, HeaderContainer, Wrapper } from "./styles";
import ThemeToggle from "./themeButton/ThemeButton";
import HambugerButton from "./hambugerButton/HambugerButton";
import DrawerMenu from "./drawerMenu/Menu";

// =============================================================================

interface ItoggleTheme {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// =============================================================================

export default function Header({ toggleTheme, isDarkMode }: ItoggleTheme) {
  const loginState = useRecoilValue(logined);
  const location = useLocation();

  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth > 1065 && setDrawerMenuOpen(false)
    );
  }, []);

  const menuData = [
    { name: "공지사항", path: "/notice" },
    { name: "사는얘기", path: "/life" },
    { name: "Q & A", path: "/question" },
    { name: "오늘의 명언", path: "/quote" },
  ];

  return (
    <HeaderContainer pathname={location.pathname}>
      <HeaderBox>
        <Logo>Developer</Logo>
        <Menu menu={menuData} />
        <SearchBar />
        <ThemeToggle toggleTheme={toggleTheme}>
          {isDarkMode ? "☀️ 라이트모드" : "🌙 다크모드"}
        </ThemeToggle>
        {loginState ? <AvartarClickMenu /> : <LoginSignUpBtn />}
        <HambugerButton />
        <DrawerMenu />
      </HeaderBox>
      <Wrapper
        isOpend={drawerMenuOpen}
        onClick={() => setDrawerMenuOpen((current) => !current)}
      />
    </HeaderContainer>
  );
}
