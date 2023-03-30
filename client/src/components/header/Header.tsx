import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// File
import { isOpendAvartarMenu, logined } from "../../atom";
import Avartar from "../Avartar";
import AvartarClickMenu from "./avartarClickMenu/AvartarMenu";
import LoginSignUpBtn from "./loginSignUpButton/Buttons";

import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import SearchBar from "./search/Search";
import { Styles } from "./styles";
import ThemeToggle from "./themeButton/ThemeButton";
import { useEffect, useState } from "react";
import axios from "axios";

// =============================================================================

interface ItoggleTheme {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// =============================================================================

export default function Header({ toggleTheme, isDarkMode }: ItoggleTheme) {
  const loginState = useRecoilValue(logined);
  const [avartarURL, setAvartarURL] = useState("");
  useEffect(() => {
    axios.get("/user/avartar").then((response) => setAvartarURL(response.data));
  }, []);

  const [isOpend, setIsOpend] = useRecoilState(isOpendAvartarMenu);

  const menuData = [
    { name: "공지사항", path: "/notice" },
    { name: "사는얘기", path: "/life" },
    { name: "Q & A", path: "/question" },
    { name: "오늘의 명언", path: "/quote" },
  ];

  const onClickAvartar = () => setIsOpend((current) => !current);
  const location = useLocation();

  return (
    <Styles.HeaderContainer pathname={location.pathname}>
      <Styles.HeaderBox>
        <Logo>Developer</Logo>
        <Menu menu={menuData} />
        <SearchBar />
        <ThemeToggle toggleTheme={toggleTheme}>
          {isDarkMode ? "☀️ 라이트모드" : "🌙 다크모드"}
        </ThemeToggle>
        {loginState ? (
          <>
            <Avartar
              width="35px"
              heigth="35px"
              onClick={onClickAvartar}
              src={avartarURL}
            />
            {isOpend ? <AvartarClickMenu /> : null}
          </>
        ) : (
          <LoginSignUpBtn />
        )}
      </Styles.HeaderBox>
    </Styles.HeaderContainer>
  );
}
