import { useRecoilState, useRecoilValue } from "recoil";
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
import { isOpendDrawerMenu, logined } from "../../../atom";
import { Link } from "react-router-dom";
import ThemeToggle from "../themeButton/ThemeButton";
import axios from "axios";
import { avartarUrl } from "./../../../atom";
import Avartar from "../../common/Avartar";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { profileUserInfoGet } from "../../../axios";

interface IProfileData {
  name: string;
  nickname: string;
}

export default function DrawerMenu() {
  const [drawerMenuOpen, setDrawerMenuOpen] = useRecoilState(isOpendDrawerMenu);
  const [isLogin, setIsLogin] = useRecoilState(logined);
  const avartar = useRecoilValue(avartarUrl);

  const { data } = useQuery<IProfileData>(
    "user-profile",
    () => profileUserInfoGet(),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

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
      setIsLogin(false);
    });
  };

  return (
    <Container open={drawerMenuOpen}>
      <ButtonContainer>
        <CloseButton onClick={closeDrawerMenu}>✖</CloseButton>
      </ButtonContainer>
      <UserInfo>
        <Avartar src={avartar} width="40px" heigth="40px" />
        <span>{data?.nickname}</span>
      </UserInfo>
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
        {isLogin ? (
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
