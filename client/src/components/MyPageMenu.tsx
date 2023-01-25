import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface IActive {
  active: boolean;
}

const Menu = styled.div`
  width: 25%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;
const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 50px;
`;
const MenuList = styled.ul`
  width: 270px;
`;
const MenuItem = styled.li<IActive>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    color: black;
    background-color: #e5e7eb;
  }
  svg {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`;

const MenuItem1 = styled(MenuItem)<IActive>`
  background-color: ${(props) => (props.active === true ? "#e5e7eb" : null)};
  color: ${(props) => (props.active === true ? "black" : "rgba(0,0,0,0.7)")};
`;

const MenuItem2 = styled(MenuItem)<IActive>`
  background-color: ${(props) => (props.active === true ? "#e5e7eb" : null)};
  color: ${(props) => (props.active === true ? "black" : "rgba(0,0,0,0.7)")};
`;

export default function MyPageMenu() {
  const [profile, setProfile] = useState(false);
  const [account, setAccount] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/profile") {
      setProfile(true);
    }
    setProfile((current) => current);
    if (location.pathname === "/account") {
      setAccount(true);
    }
    setAccount((current) => current);
  }, [location.pathname]);

  return (
    <Menu>
      <MenuTitle>내 계정</MenuTitle>
      <MenuList>
        <Link to="/profile">
          <MenuItem1 active={profile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            회원정보
          </MenuItem1>
        </Link>
        <Link to="/account">
          <MenuItem2 active={account}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"></path>
            </svg>
            계정
          </MenuItem2>
        </Link>
      </MenuList>
    </Menu>
  );
}
