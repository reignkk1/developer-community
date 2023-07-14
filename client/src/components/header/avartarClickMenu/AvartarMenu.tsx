import axios from "axios";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isOpendAvartarMenu } from "../../../atom";
import Avartar from "../../common/Avartar";
import {
  AvartarMenu,
  AvartarMenuBox,
  Container,
  LogoutBtn,
  AvartarMenuItem,
} from "./styles";
import { useGetAxios } from "../../../hooks/api/http";
import { IUserData } from "../../../types";

export default function AvartarClickMenu() {
  const [isOpend, setIsOpend] = useRecoilState(isOpendAvartarMenu);
  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");

  const menuItem = [
    {
      to: "/profile",
      name: "내 프로필",
    },
    {
      to: "/account",
      name: "내 계정",
    },
    {
      to: `/user/${loginUser?.id}/posts`,
      name: "활동 내역",
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => setIsOpend(false));
  }, [setIsOpend]);

  const avartarMenu = useRef<HTMLDivElement>(null);
  const avartar = useRef<HTMLImageElement>(null);

  const onClickAvartar = () => setIsOpend((current) => !current);

  useEffect(() => {
    const onClickOutside = (e: any) => {
      if (
        !avartarMenu.current?.contains(e.target) &&
        !avartar.current?.contains(e.target)
      )
        setIsOpend(false);
    };
    if (isOpend) document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [setIsOpend, isOpend]);

  const handleLogout = () =>
    axios.post("/user/logout").then(() => window.location.reload());
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
            {menuItem.map((item) => (
              <AvartarMenuItem onClick={() => setIsOpend(false)}>
                <Link to={item.to}>{item.name}</Link>
              </AvartarMenuItem>
            ))}
          </AvartarMenu>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </AvartarMenuBox>
      ) : null}
    </Container>
  );
}
