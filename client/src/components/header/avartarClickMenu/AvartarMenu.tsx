import axios from "axios";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isOpendAvartarMenu, logined } from "../../../atom";
import MenuItem from "./menuItem/MenuItem";
import { Styles } from "./styles";

export default function AvartarClickMenu() {
  const setLoginState = useSetRecoilState(logined);
  const [isOpend, setIsOpend] = useRecoilState(isOpendAvartarMenu);

  const avartarMenu = useRef<HTMLDivElement>(null);
  const avartar = useRef<HTMLImageElement>(null);

  const onClickOutside = (e: any) => {
    if (
      !avartarMenu.current?.contains(e.target) &&
      !avartar.current?.contains(e.target)
    )
      setIsOpend(false);
  };

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
    axios.get("/user/me").then((response) => navigate(`${response.data}`));
  };

  return (
    <Styles.AvartarMenuBox ref={avartarMenu}>
      <Styles.AvartarMenu>
        <MenuItem>
          <Link to="/profile">내 프로필</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/account">내 계정</Link>
        </MenuItem>
        <MenuItem>
          <Styles.UserActivity onClick={userMe}>활동내역</Styles.UserActivity>
        </MenuItem>
      </Styles.AvartarMenu>
      <Styles.LogoutBtn onClick={onClick}>로그아웃</Styles.LogoutBtn>
    </Styles.AvartarMenuBox>
  );
}
