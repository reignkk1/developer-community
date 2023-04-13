import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

// File
import MyPageMenu from "../components/userProfile/sideMenu/MyPageMenu";
import { logined } from "../atom";
import UserForm from "../components/userProfile/userForm/UserForm";
import UserAvartar from "../components/userProfile/avartar/UserAvartar";

// =============================================================================

const Main = styled.main`
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`;
const UserInfoBox = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  padding: 0px 0px 20px 70px;
`;
const UserInfo = styled.div`
  width: 60%;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 40px;
`;

// =============================================================================

export default function Profile() {
  // 로그인 상태
  const loginState = useRecoilValue(logined);

  return loginState ? (
    <Main>
      <MyPageMenu />
      <UserInfoBox>
        <UserInfo>
          <Title>회원정보</Title>
          <UserForm />
        </UserInfo>
        <UserAvartar />
      </UserInfoBox>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
