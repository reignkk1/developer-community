import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

// File
import MyPageMenu from "../components/userProfile/MyPageMenu";
import { logined } from "../atom";
import UserForm from "./../components/userProfile/userForm";

// =============================================================================

const Main = styled.main`
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`;
const UserContainer = styled.div`
  width: 75%;
`;
const UserInfoBox = styled.div`
  display: flex;
  width: 100%;
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

const UserAvartar = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 50%;
  margin-top: 50px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

// =============================================================================

export default function Profile() {
  const loginState = useRecoilValue(logined);

  return loginState ? (
    <Main>
      <MyPageMenu />
      <UserContainer>
        <UserInfoBox>
          <UserInfo>
            <Title>회원정보</Title>
            <UserForm />
          </UserInfo>
          <UserAvartar
            src="https://graph.facebook.com/555897032021233/picture?width=200&height=200"
            alt="프로필"
          />
        </UserInfoBox>
      </UserContainer>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
