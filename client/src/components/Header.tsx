import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

// File
import { logined } from "../atom";
import { FieldErrors } from "react-hook-form/dist/types";

// =============================================================================

const HeaderContainer = styled.header<{ pathname: String }>`
  display: ${(props) =>
    props.pathname === "/signup" ||
    props.pathname === "/login" ||
    props.pathname === "/account/password-change" ||
    props.pathname === "/account/withdraw-confirm"
      ? "none"
      : "flex"};
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 15px 0px;
`;

const HeaderBox = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.h1`
  color: #0092fa;
  font-size: 25px;
`;
const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MenuItem = styled.li`
  margin-right: 35px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  button {
    color: white;
    font-weight: bold;
    background-color: #0092fa;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #0580d7;
    }
  }
`;

const SearchBar = styled.input`
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: none;
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const ButtonBox = styled.div``;
const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-weight: bold;
  font-size: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const JoinBtn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 12px;
  &:hover {
    background-color: #0580d7;
  }
`;

const Avartar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
`;

const AvartarMenuBox = styled.div`
  width: 220px;
  height: 180px;
  border: 1px solid ${(props) => props.theme.borderColor};
  position: absolute;
  right: 120px;
  top: 60px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

const AvartarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  padding: 10px 40px;
`;
const AvartarMenuItem = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
  }
`;

const UserActivity = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #0092fa;
  }
`;

const LogoutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 25px 40px;
  font-weight: bold;
  &:hover {
    color: #0092fa;
  }
`;

const ThemeBtn = styled.button`
  width: 130px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgThemeBtnColor};
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px 15px 8px 5px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

// =============================================================================

interface ItoggleTheme {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

interface ISearchKeyword {
  searchKeyword: string;
}

// =============================================================================

export default function Header({ toggleTheme, isDarkMode }: ItoggleTheme) {
  const theme = useTheme();
  const menu = [
    { name: "공지사항", path: "/notice" },
    { name: "사는얘기", path: "/life" },
    { name: "Q & A", path: "/question" },
    { name: "오늘의 명언", path: "/quote" },
  ];

  const {
    register,
    handleSubmit,

    setValue,
  } = useForm<ISearchKeyword>();

  const [loginState, setLoginState] = useRecoilState(logined);
  const [avartarClick, setAvartarClick] = useState(false);

  const avartarMenu = useRef<HTMLDivElement>(null);
  const avartar = useRef<HTMLImageElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const onClickOutside = (e: any) => {
    if (
      !avartarMenu.current?.contains(e.target) &&
      !avartar.current?.contains(e.target)
    )
      setAvartarClick(false);
  };

  useEffect(() => {
    if (avartarClick) document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [avartarClick]);

  const onClick = () => {
    axios.post("/user/logout", {}, { withCredentials: true }).then(() => {
      window.location.reload();
      setLoginState(false);
      setAvartarClick(false);
    });
  };

  const onAvatarClick = () => {
    setAvartarClick((current) => !current);
  };
  const onAvatarMenuClick = () => {
    setAvartarClick((current) => !current);
  };

  const onValid = (data: ISearchKeyword) => {
    setValue("searchKeyword", "");
    navigate(`/search?keyword=${data.searchKeyword}`);
  };
  const oninvalid = (error: FieldErrors) =>
    alert(`${error.searchKeyword?.message}`);

  const userMe = () => {
    axios
      .get("/user/me", { withCredentials: true })
      .then((response) => navigate(`${response.data}`));
  };

  return (
    <HeaderContainer pathname={location.pathname}>
      <HeaderBox>
        <Link to="/">
          <Logo>Developer</Logo>
        </Link>
        <Menu>
          {menu.map((item, index) => (
            <MenuItem key={index}>
              <Link
                to={item.path}
                style={{
                  color: `${
                    location.pathname === item.path
                      ? "#0092fa"
                      : theme.textColor
                  }`,
                }}
              >
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </Menu>
        <Form onSubmit={handleSubmit(onValid, oninvalid)}>
          <SearchBar
            type="text"
            {...register("searchKeyword", {
              required: "검색어를 입력해주세요.",
            })}
          />
          <button>검색</button>
        </Form>
        <ThemeBtn onClick={toggleTheme}>
          {isDarkMode ? "☀️ 라이트모드" : "🌙 다크모드"}
        </ThemeBtn>
        {loginState ? (
          <>
            <Avartar
              ref={avartar}
              onClick={onAvatarClick}
              src="	https://graph.facebook.com/555897032021233/picture?width=100&height=100"
              alt="프로필"
            />
            {avartarClick ? (
              <AvartarMenuBox ref={avartarMenu}>
                <AvartarMenu>
                  <AvartarMenuItem onClick={onAvatarMenuClick}>
                    <Link to="/profile">내 프로필</Link>
                  </AvartarMenuItem>

                  <AvartarMenuItem onClick={onAvatarMenuClick}>
                    <Link to="/account">내 계정</Link>
                  </AvartarMenuItem>

                  <AvartarMenuItem onClick={onAvatarMenuClick}>
                    <UserActivity onClick={userMe}>활동내역</UserActivity>
                  </AvartarMenuItem>
                </AvartarMenu>
                <LogoutBtn onClick={onClick}>로그아웃</LogoutBtn>
              </AvartarMenuBox>
            ) : null}
          </>
        ) : (
          <ButtonBox>
            <Link to="/login">
              <LoginBtn>로그인</LoginBtn>
            </Link>
            <Link to="/signup">
              <JoinBtn>회원가입</JoinBtn>
            </Link>
          </ButtonBox>
        )}
      </HeaderBox>
    </HeaderContainer>
  );
}
