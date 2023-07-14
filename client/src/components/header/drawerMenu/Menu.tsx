import { useRecoilState } from "recoil";
import {
  ButtonContainer,
  CloseButton,
  Container,
  LogOut,
  Menu,
  MenuList,
  SignBox,
  Theme,
  UserInfo,
} from "./styles";
import { isOpendDrawerMenu } from "../../../atom";
import { Link } from "react-router-dom";
import ThemeToggle from "../themeButton/ThemeButton";
import axios from "axios";
import Avartar from "../../common/Avartar";
import { useGetAxios } from "../../../hooks/api/http";
import { IUserData } from "../../../types";

export default function DrawerMenu() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");

  const menuData = [
    { name: "공지사항", path: "/notice" },
    { name: "사는얘기", path: "/life" },
    { name: "Q & A", path: "/question" },
    { name: "오늘의 명언", path: "/quote" },
  ];

  const closeDrawerMenu = () => setDrawerMenuOpen(false);

  const onClick = () => {
    axios.post("/user/logout").then(() => {
      window.location.reload();
    });
  };

  return (
    <Container open={drawerMenuOpen}>
      <ButtonContainer>
        <CloseButton onClick={closeDrawerMenu}>✖</CloseButton>
      </ButtonContainer>
      {loginUser ? (
        <UserInfo>
          <Link to="/profile" onClick={closeDrawerMenu}>
            <Avartar src={loginUser.avartar} width="40px" heigth="40px" />
          </Link>
        </UserInfo>
      ) : null}
      <Menu>
        {menuData.map((item) => (
          <Link to={item.path} onClick={closeDrawerMenu}>
            <MenuList>{item.name}</MenuList>
          </Link>
        ))}
      </Menu>
      <Theme>
        <ThemeToggle />
      </Theme>
      <SignBox>
        {loginUser ? (
          <LogOut onClick={onClick}>로그아웃</LogOut>
        ) : (
          <>
            <Link to="/login">로그인 </Link>
            <span style={{ cursor: "default", margin: "0px 10px" }}> / </span>
            <Link to="/signup"> 회원가입</Link>
          </>
        )}
      </SignBox>
    </Container>
  );
}
