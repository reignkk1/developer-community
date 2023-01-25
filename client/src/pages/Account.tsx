import styled from "@emotion/styled";
import MyPageMenu from "../components/MyPageMenu";

const Main = styled.main`
  border: 1px solid red;
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`;

const AccountInfoBox = styled.div`
  width: 75%;
`;

const AccountControlBox = styled.div`
  width: 100%;
  padding: 0px 0px 20px 70px;
  &:nth-child(2) {
    padding-top: 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 40px;
`;

const PasswordChangeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const PasswordChangeBtn = styled.button`
  background-color: #e40e0e;
  border: none;
  padding: 10px 45px 10px 15px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  border-radius: 7px;
  font-size: 15px;
  &:hover {
    background-color: #b91c1c;
  }
`;
const Svg = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

export default function Account() {
  return (
    <Main>
      <MyPageMenu />

      <AccountInfoBox>
        <AccountControlBox>
          <Title>비밀번호</Title>
          <PasswordChangeBox>
            <PasswordChangeBtn>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
              </Svg>
              비밀번호 변경
            </PasswordChangeBtn>
          </PasswordChangeBox>
        </AccountControlBox>
        <AccountControlBox>
          <Title>계정삭제</Title>
          <PasswordChangeBox>
            <PasswordChangeBtn>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
              </Svg>
              비밀번호 변경
            </PasswordChangeBtn>
          </PasswordChangeBox>
        </AccountControlBox>
      </AccountInfoBox>
    </Main>
  );
}
