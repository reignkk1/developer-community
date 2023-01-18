import styled from "@emotion/styled";
import MyPageMenu from "../components/MyPageMenu";

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
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 17px;
  &:focus {
    border-color: black;
  }
`;
const Label = styled.label`
  margin-bottom: 5px;
`;

const UserAvartar = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 50%;
  margin-top: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export default function Profile() {
  return (
    <Main>
      <MyPageMenu />
      <UserContainer>
        <UserInfoBox>
          <UserInfo>
            <Title>회원정보</Title>
            <UserForm>
              <Label>이름</Label>
              <Input />
              <Label>닉네임</Label>
              <Input />
            </UserForm>
          </UserInfo>
          <UserAvartar src="https://graph.facebook.com/555897032021233/picture?width=200&height=200" />
        </UserInfoBox>
      </UserContainer>
    </Main>
  );
}
