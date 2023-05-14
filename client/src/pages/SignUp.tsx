import styled from "@emotion/styled";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";
import { Link, Navigate, useNavigate } from "react-router-dom";

// File
import { IUserData } from "../types";
import { useRecoilValue } from "recoil";
import { logined } from "../atom";
import InputContainer from "../components/common/InputContainer";

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
  color: ${(props) => props.theme.textColor};
`;
const P2 = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;
const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ErrorMsg = styled.span`
  color: red;
  text-align: start;
  font-size: 13px;
  margin-bottom: 15px;
`;
const Btn = styled.button`
  width: 100%;
  background-color: #0092fa;
  cursor: pointer;
  border: none;
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
const BottomLogin = styled.div`
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

// =============================================================================

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>();
  const loginState = useRecoilValue(logined);
  const navigate = useNavigate();
  const onValid = (data: IUserData) => {
    axios
      .post("/user", {
        userID: data.userID,
        password: data.password,
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        create_time: new Date().toLocaleDateString("ko-kr"),
      })
      .then(() => navigate("/login"))
      .then(() => alert("가입이 완료되었습니다!"));
  };
  const oninvalid = (error: FieldErrors) => console.log(error);

  return loginState ? (
    <Navigate to="/" />
  ) : (
    <Main>
      <LogoBox>
        <Link to="/">
          <Logo src="https://okky.kr/okky.svg" alt="로고" />
        </Link>
        <P1>Developer에 오신것을 환영합니다.</P1>
        <P2>소프트웨어 개발자를 위한 지식공유 플랫폼입니다.</P2>
      </LogoBox>
      <InputForm onSubmit={handleSubmit(onValid, oninvalid)}>
        <InputContainer
          register={register}
          label="아이디"
          name="userID"
          type="text"
          placeholder="4~15자 이내로 입력해주세요."
          required={true}
          minLength={4}
          maxlength={15}
        />
        <ErrorMsg>{errors.userID?.message}</ErrorMsg>
        <InputContainer
          register={register}
          label="비밀번호"
          name="password"
          type="password"
          placeholder="최소 6자 이상"
          required={true}
          minLength={6}
        />
        <ErrorMsg>{errors.password?.message}</ErrorMsg>
        <InputContainer
          register={register}
          label="이메일"
          name="email"
          type="email"
          placeholder="mingyeom@okky.kr"
          required={true}
        />
        <ErrorMsg>{errors.email?.message}</ErrorMsg>
        <InputContainer
          register={register}
          label="실명"
          name="name"
          type="text"
          placeholder="홍길동"
          required={true}
        />
        <ErrorMsg>{errors.name?.message}</ErrorMsg>
        <InputContainer
          register={register}
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요!"
          required={true}
          maxlength={20}
        />
        <ErrorMsg>{errors.nickname?.message}</ErrorMsg>
        <Btn>가입하기</Btn>
        <BottomLogin>
          <span>이미 회원이신가요?</span>
          <Link to="/login">로그인</Link>
        </BottomLogin>
      </InputForm>
    </Main>
  );
}
