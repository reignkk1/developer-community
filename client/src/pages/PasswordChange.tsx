import styled from "@emotion/styled";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGetAxios } from "../hooks/api/http";

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

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px 15px;
  font-size: 18px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  letter-spacing: 2px;
  background-color: ${(props) => props.theme.inputColor};
  &:focus {
    border: 1px solid black;
  }
  outline: none;
  margin-bottom: 20px;
`;
const Label = styled.label`
  margin-bottom: 5px;
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

// =============================================================================

interface IData {
  currentPassWord: string;
  newPassWord: string;
  passWordComfirm: string;
}
// =============================================================================

export default function PasswordChange() {
  const { register, handleSubmit } = useForm<IData>();

  const { data: loginUser } = useGetAxios("/user/login-info");

  const navigate = useNavigate();

  const onValid = (data: IData) => {
    const { currentPassWord, newPassWord, passWordComfirm } = data;
    if (data.newPassWord !== data.passWordComfirm)
      return alert("비밀번호가 서로 일치하지 않습니다!");
    axios
      .patch("/password", { currentPassWord, newPassWord, passWordComfirm })
      .then((response) => {
        navigate("/account");
        alert(`${response.data}`);
      })
      .catch((error) => console.log(error));
  };
  const oninvalid = () => {};
  return loginUser ? (
    <Main>
      <LogoBox>
        <Link to="/">
          <Logo src="https://okky.kr/okky.svg" alt="로고" />
        </Link>
        <P1>변경하실 비밀번호를 입력해주세요.</P1>
      </LogoBox>
      <InputForm onSubmit={handleSubmit(onValid, oninvalid)}>
        <Label htmlFor="current">현재 비밀번호</Label>
        <Input
          type="password"
          id="current"
          {...register("currentPassWord", {
            required: "비밀번호를 입력해주세요.",
          })}
        />
        <Label htmlFor="new">신규 비밀번호</Label>
        <Input
          type="password"
          id="new"
          {...register("newPassWord", {
            required: "신규 비밀번호를 입력해주세요.",
          })}
        />
        <Label htmlFor="confirm">신규 비밀번호 확인</Label>
        <Input
          type="password"
          id="confirm"
          {...register("passWordComfirm", {
            required: "비밀번호 확인을 입력해주세요.",
          })}
        />
        <Btn>비밀번호 변경</Btn>
      </InputForm>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
