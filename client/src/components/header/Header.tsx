import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

// File
import { isOpendDrawerMenu } from "../../atom";
import AvartarClickMenu from "./avartarClickMenu/AvartarMenu";
import LoginSignUpBtn from "./loginSignUpButton/Buttons";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import SearchBar from "./search/Search";
import { HeaderBox, HeaderContainer, Wrapper } from "./styles";
import ThemeToggle from "./themeButton/ThemeButton";
import HambugerButton from "./hambugerButton/HambugerButton";
import DrawerMenu from "./drawerMenu/Menu";
import { useGetAxios } from "../../hooks/api/http";

// =============================================================================

export default function Header() {
  const location = useLocation();
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  const { data: loginUser } = useGetAxios("/user/login-info");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth > 1065 && setDrawerMenuOpen(false)
    );
  }, [setDrawerMenuOpen]);

  const menuData = [
    { name: "공지사항", path: "/notice" },
    { name: "사는얘기", path: "/life" },
    { name: "Tech", path: "/tech" },
    { name: "방명록", path: "/guest-book" },
  ];

  return (
    <HeaderContainer pathname={location.pathname}>
      <HeaderBox>
        <Logo>Developer</Logo>
        <Menu menu={menuData} />
        <SearchBar />
        <ThemeToggle />
        {loginUser ? <AvartarClickMenu /> : <LoginSignUpBtn />}
        <HambugerButton />
        {drawerMenuOpen ? <DrawerMenu /> : null}
      </HeaderBox>
      <Wrapper
        isOpend={drawerMenuOpen}
        onClick={() => setDrawerMenuOpen((current) => !current)}
      />
    </HeaderContainer>
  );
}
