import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";
import { Link } from "react-router-dom";

const Main = styled.main`
  width: 510px;
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
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 12px;
  color: black;
`;
const P2 = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  &:focus {
    border: 1px solid #0580d7;
  }
  outline: none;
  margin-bottom: 20px;
`;
const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;
const Btn = styled.button`
  width: 100%;
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  margin-top: 100px;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: #0580d7;
  }
`;

interface IFormData {
  id: string;
  password: string;
  email: string;
  name: string;
  nickname: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onValid = (data: IFormData) => console.log(data);
  const oninvalid = (error: FieldErrors) => console.log(error);

  return (
    <Main>
      <LogoBox>
        <Link to="/">
          <Logo src="https://okky.kr/okky.svg" />
        </Link>
        <P1>OKKY에 오신것을 환영합니다.</P1>
        <P2>OKKY는 소프트웨어 개발자를 위한 지식공유 플랫폼입니다.</P2>
      </LogoBox>
      <InputForm onSubmit={handleSubmit(onValid, oninvalid)}>
        <Label>아이디</Label>
        <Input
          placeholder="4~15자 이내로 입력해주세요"
          type="text"
          {...register("id", { required: "아이디를 입력해주세요!" })}
        />
        <Label>비밀번호</Label>
        <Input
          placeholder="최소 6자 이상"
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요!" })}
        />
        <Label>이메일</Label>
        <Input
          placeholder="mingyeom@okky.kr"
          type="email"
          {...register("email", { required: "이메일를 입력해주세요!" })}
        />
        <Label>실명</Label>
        <Input
          placeholder="홍길동"
          type="text"
          {...register("name", { required: "실명을 입력해주세요!" })}
        />
        <Label>닉네임</Label>
        <Input
          placeholder="20자 이하로 입력해주세요"
          type="text"
          {...register("nickname", { required: "닉네임을 입력해주세요!" })}
        />
        <Btn>가입하기</Btn>
      </InputForm>
    </Main>
  );
}
