import styled from '@emotion/styled';
import axios from 'axios';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

// File

import InputContainer from '../components/common/InputContainer';
import { IUser } from '../types/types';
import KakaoAuthButton from '../components/auth/AuthKakaoButton';
import useLoginUser from '../hooks/useLoginUser';

// =============================================================================

const Main = styled.main`
  width: 450px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
`;
const LogoBox = styled.div`
  margin-bottom: 80px;
`;
const Logo = styled.img`
  width: 80px;
  margin-bottom: 30px;
`;
const P1 = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${props => props.theme.textColor};
`;
const P2 = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.textColor};
`;
const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    margin-bottom: 15px;
  }
`;

const BottomSignUp = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  a {
    color: #0580d7;
    text-decoration: underline;
    margin-left: 5px;
  }
`;

const Btn = styled.button`
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: #0092fa;
  color: white;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  margin-top: 50px;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: #0580d7;
  }
`;

// =============================================================================

export default function Login() {
  const loginUser = useLoginUser();
  const { register, handleSubmit } = useForm<IUser>();

  const onValid = async (data: IUser) => {
    const response = await axios.post('/user/login', {
      loginUserID: data.id,
      loginPassword: data.password,
    });

    if (response.data.errorMsg) return alert(`${response.data.errorMsg}`);

    return window.location.replace('/');
  };

  const oninvalid = (error: FieldErrors) => console.log(error);

  return loginUser ? (
    <Navigate to="/" />
  ) : (
    <Main>
      <LogoBox>
        <Link to="/">
          <Logo src="https://okky.kr/okky.svg" alt="로고" />
        </Link>
        <P1>Developer에 오신것을 환영합니다.</P1>
        <P2>Developer는 소프트웨어 개발자를 위한 지식공유 플랫폼입니다.</P2>
      </LogoBox>
      <InputForm onSubmit={handleSubmit(onValid, oninvalid)}>
        <InputContainer
          register={register}
          label="아이디"
          name="id"
          type="text"
          placeholder="4~15자 이내로 입력해주세요."
          required={true}
        />
        <InputContainer
          register={register}
          label="비밀번호"
          name="password"
          type="password"
          placeholder="최소 6자 이상"
          required={true}
        />
        <Btn>로그인</Btn>
      </InputForm>
      <KakaoAuthButton />
      <BottomSignUp>
        <span>아직 회원이 아니신가요?</span>
        <Link to="/signup">회원가입</Link>
      </BottomSignUp>
    </Main>
  );
}
