import { useState } from 'react';
import styled from '@emotion/styled';
import { Link, Navigate } from 'react-router-dom';

// File
import MyPageMenu from '../components/user/UserProfileMenu';
import useLoginUser from '../hooks/useLoginUser';

// =============================================================================

const Main = styled.main`
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  @media (max-width: 1065px) {
    flex-direction: column;
  }
  @media (max-width: 1300px) {
    width: 80%;
  }
`;
const AccountInfoBox = styled.div`
  width: 100%;

  @media (max-width: 1300px) {
    margin-top: 25px;
  }
`;
const AccountControlBox = styled.div`
  width: 100%;
  padding: 0px 0px 20px 70px;
  &:nth-of-type(2) {
    padding-top: 30px;
    border-top: 1px solid ${props => props.theme.borderColor};
  }
  @media (max-width: 1065px) {
    padding: 0px 0px 20px 0px;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 40px;
`;
const ControlBox = styled.div`
  width: 100%;
  display: flex;
`;
const FirstControlBox = styled(ControlBox)`
  justify-content: flex-end;
`;
const SecondControlBox = styled(ControlBox)`
  justify-content: space-between;
  @media (max-width: 670px) {
    flex-direction: column;
  }
`;
const SignDelete = styled.div`
  border: 1px solid ${props => props.theme.borderColor};

  border-radius: 8px;
  margin-bottom: 30px;
  padding: 15px 15px;
`;
const SignDeleteText = styled.p`
  opacity: 0.7;
  font-size: 13.3px;
  line-height: 1.4;
  span {
    font-weight: bold;
  }
`;
const Btn = styled.button`
  background-color: #e40e0e;
  border: none;
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
const PasswordChangeBtn = styled(Btn)`
  padding: 10px 45px 10px 15px;
`;
const UnRegisterBtn = styled(Btn)`
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px 54px 10px 23px;
    color: white;
    @media (max-width: 670px) {
      justify-content: center;
      margin-right: 10px;
    }
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
`;
const Svg = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

const AgreeBox = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1300px) {
    margin-bottom: 10px;
  }
`;
const CheckBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right: 10px;
`;
const Label = styled.label`
  font-size: 14px;
`;

// =============================================================================

export default function Account() {
  const [checked, setChecked] = useState(false);
  const loginUser = useLoginUser();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  return loginUser ? (
    <Main>
      <MyPageMenu />

      <AccountInfoBox>
        <AccountControlBox>
          <Title>비밀번호</Title>
          <FirstControlBox>
            <Link to="password-change">
              <PasswordChangeBtn>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                </Svg>
                비밀번호 변경
              </PasswordChangeBtn>
            </Link>
          </FirstControlBox>
        </AccountControlBox>
        <AccountControlBox>
          <Title>계정삭제</Title>
          <SignDelete>
            <SignDeleteText>
              회원 탈퇴일로부터 계정과 닉네임을 포함한 계정
              정보(아이디/이메일/닉네임)는
              <br /> 개인정보 보호방침에 따라 <span>60일간 보관(잠김)</span>
              되며, 60일 경과된 후에는 모든 개인 정보는 완전히 삭제되며 더 이상
              복구할 수 없게 됩니다.
              <br />
              <br />
              작성된 게시물은 삭제되지 않으며, 익명처리 후 OKKY 로 소유권이
              귀속됩니다.
            </SignDeleteText>
            <SignDeleteText></SignDeleteText>
          </SignDelete>
          <SecondControlBox>
            <AgreeBox>
              <CheckBox id="delete" type="checkbox" onChange={onChange} />
              <Label htmlFor="delete">
                계정 삭제에 관한 정책을 읽고 이에 동의합니다.
              </Label>
            </AgreeBox>

            <UnRegisterBtn disabled={checked ? false : true}>
              <Link to="withdraw-confirm">
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                </Svg>
                회원 탈퇴
              </Link>
            </UnRegisterBtn>
          </SecondControlBox>
        </AccountControlBox>
      </AccountInfoBox>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
