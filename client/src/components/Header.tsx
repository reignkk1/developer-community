import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

const HeaderBox = styled.header<{ pathname: string }>`
  width: 100%;
  background-color: white;
  padding: 15px 120px;
  display: ${(props) =>
    props.pathname === "/signup"
      ? "none"
      : props.pathname === "/login"
      ? "none"
      : "flex"};
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  z-index: 99;
`;
const Svg = styled.svg`
  width: 115px;
  height: 30px;
`;
const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MenuItem = styled.li`
  margin-right: 35px;
  a {
    &:hover {
      color: #0092fa;
    }
    font-weight: bold;
  }
`;

const SearchBar = styled.input``;
const ButtonBox = styled.div``;
const LoginBtn = styled.button`
  background-color: White;
  cursor: pointer;
  border: none;
  color: black;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 12px;
  &:hover {
    background-color: #f0f0f0;
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

export default function Header() {
  const location = useLocation();

  return (
    <HeaderBox pathname={location.pathname}>
      <Link to="/">
        <Svg>
          <svg
            width="115"
            height="28"
            viewBox="0 0 115 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59.1332 14.483C59.1332 15.814 58.8878 17.0609 58.3972 18.2238C57.8995 19.3967 57.1703 20.458 56.2528 21.3448C55.316 22.2478 54.213 22.9623 53.0042 23.4489C50.5649 24.4349 47.8357 24.4349 45.3964 23.4489C44.1984 22.9668 43.1091 22.2514 42.1923 21.3448C41.2363 20.4281 40.5109 19.3834 40.0161 18.2109C39.5193 17.0306 39.2668 15.7627 39.2736 14.483C39.2736 13.1605 39.5211 11.9157 40.0161 10.7487C40.5111 9.58172 41.2365 8.53912 42.1923 7.62091C43.1092 6.71437 44.1985 5.99903 45.3964 5.51675C47.8422 4.53088 50.5772 4.53088 53.023 5.51675C54.2287 5.9987 55.3264 6.71388 56.2528 7.62091C57.1681 8.50837 57.8952 9.56977 58.391 10.7422C58.8858 11.9133 59.1332 13.1602 59.1332 14.483ZM49.2095 19.917C50.6135 19.917 51.7746 19.403 52.6928 18.3751C53.611 17.3471 54.07 16.0498 54.0697 14.483C54.0697 12.9328 53.6043 11.6397 52.6736 10.6036C51.7429 9.56746 50.5882 9.04928 49.2095 9.04902C47.805 9.04902 46.6439 9.56503 45.7262 10.5971C44.8085 11.6291 44.3496 12.9244 44.3493 14.483C44.3493 16.0671 44.8019 17.3687 45.707 18.3877C46.6122 19.4067 47.7797 19.9165 49.2095 19.917Z"
              fill="#3D4046"
            />
            <path
              d="M61.2656 23.6956V5.19434H66.2785V13.5972L72.1539 5.19434H78.0546L71.1893 14.2175L78.651 23.6956H72.3315L66.2785 15.3928V23.6956H61.2656Z"
              fill="#3D4046"
            />
            <path
              d="M80.8904 23.6956V5.19434H85.9044V13.5972L91.7795 5.19434H97.679L90.8137 14.2175L98.2754 23.6956H91.9559L85.9044 15.3928V23.6956H80.8904Z"
              fill="#3D4046"
            />
            <path
              d="M103.615 23.6954V15.2543L97.1172 5.19489H102.931L105.431 9.95934C105.448 9.98454 105.473 10.0311 105.508 10.0984C105.752 10.5483 105.936 11.0285 106.054 11.5265C106.138 11.1135 106.32 10.6542 106.599 10.1488C106.651 10.0563 106.684 9.99269 106.701 9.95781L109.175 5.19336H114.997L108.5 15.2528V23.6939L103.615 23.6954Z"
              fill="#3D4046"
            />
            <path
              d="M30.5141 15.1104L25.7578 19.8473L34.2244 27.9408L38.9807 23.2043L30.5141 15.1104Z"
              fill="#0090F9"
            />
            <path
              d="M14.0356 27.9999V18.526L9.51289 14.0224L14.0356 9.51881V0.0449219L0 14.0224L14.0356 27.9999Z"
              fill="#0090F9"
            />
            <path
              d="M34.0552 0L15.6377 18.3271V9.87341L18.8751 13.091L23.6391 8.35401L15.4375 0.200906V9.13816V9.67441V18.5265V20.3129V28L38.8041 4.73695L34.0552 0Z"
              fill="#0090F9"
            />
          </svg>
        </Svg>
      </Link>
      <Menu>
        <MenuItem>
          <Link to="/notice">공지사항</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/life">사는얘기</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/question">Q & A</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/quote">오늘의 명언</Link>
        </MenuItem>
      </Menu>
      <SearchBar />
      <ButtonBox>
        <Link to="/login">
          <LoginBtn>로그인</LoginBtn>
        </Link>
        <Link to="/signup">
          <JoinBtn>회원가입</JoinBtn>
        </Link>
      </ButtonBox>
    </HeaderBox>
  );
}
