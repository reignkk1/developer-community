import axios from "axios";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isOpendAvartarMenu, loginUserInfoGet, logined } from "../../../atom";
import Avartar from "../../common/Avartar";
import {
  AvartarMenu,
  AvartarMenuBox,
  Container,
  LogoutBtn,
  UserActivity,
  AvartarMenuItem,
} from "./styles";

export default function AvartarClickMenu() {
  const setLoginState = useSetRecoilState(logined);
  const [isOpend, setIsOpend] = useRecoilState(isOpendAvartarMenu);
  const loginUser = useRecoilValue(loginUserInfoGet);

  useEffect(() => {
    window.addEventListener("resize", () => setIsOpend(false));
  }, []);

  const avartarMenu = useRef<HTMLDivElement>(null);
  const avartar = useRef<HTMLImageElement>(null);

  const onClickOutside = (e: any) => {
    if (
      !avartarMenu.current?.contains(e.target) &&
      !avartar.current?.contains(e.target)
    )
      setIsOpend(false);
  };
  const onClickAvartar = () => setIsOpend((current) => !current);
  useEffect(() => {
    if (isOpend) document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpend]);

  const onClick = () => {
    axios.post("/user/logout").then(() => {
      window.location.reload();
      setLoginState(false);
      setIsOpend(false);
    });
  };

  const navigate = useNavigate();
  const userMe = () => {
    axios.get("/user/login-info").then((response) => console.log(response));
  };

  return (
    <Container>
      <Avartar
        width="35px"
        heigth="35px"
        onClick={onClickAvartar}
        src={loginUser?.avartar}
        refAvartar={avartar}
      />
      {isOpend ? (
        <AvartarMenuBox ref={avartarMenu}>
          <AvartarMenu>
            <AvartarMenuItem onClick={() => setIsOpend(false)}>
              <Link to="/profile">내 프로필</Link>
            </AvartarMenuItem>
            <AvartarMenuItem onClick={() => setIsOpend(false)}>
              <Link to="/account">내 계정</Link>
            </AvartarMenuItem>
            <AvartarMenuItem onClick={() => setIsOpend(false)}>
              <UserActivity onClick={userMe}>활동내역</UserActivity>
            </AvartarMenuItem>
          </AvartarMenu>
          <LogoutBtn onClick={onClick}>로그아웃</LogoutBtn>
        </AvartarMenuBox>
      ) : null}
    </Container>
  );
}
