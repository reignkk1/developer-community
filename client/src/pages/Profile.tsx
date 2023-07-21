import styled from '@emotion/styled';
import { Navigate } from 'react-router-dom';

// File
import UserProfileMenu from '../components/user/UserProfileMenu';
import UserProfileForm from '../components/user/UserProfileForm';
import UserProfileAvartar from '../components/user/UserProfileAvartar';
import { useGetAxios } from '../hooks/api/http';

// =============================================================================

const Main = styled.main`
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;

  @media (max-width: 1300px) {
    width: 80%;
  }
  @media (max-width: 1065px) {
    flex-direction: column;
  }
`;
const UserInfoBox = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  padding: 0px 0px 20px 70px;
  @media (max-width: 1065px) {
    flex-direction: column-reverse;
    width: 100%;
    padding: 0px;
    img {
      margin-bottom: 30px;
    }
  }
`;
const UserInfo = styled.div`
  width: 60%;
  @media (max-width: 1065px) {
    width: 100%;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 40px;
`;

// =============================================================================

export default function Profile() {
  // 로그인 상태
  const { data: loginUser } = useGetAxios('/user/login-info');

  return loginUser ? (
    <Main>
      <UserProfileMenu />
      <UserInfoBox>
        <UserInfo>
          <Title>회원정보</Title>
          <UserProfileForm />
        </UserInfo>
        <UserProfileAvartar />
      </UserInfoBox>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
