import { Link } from "react-router-dom";
import { ButtonBox, JoinBtn, LoginBtn } from "./styles";

export default function LoginSignUpBtn() {
  return (
    <ButtonBox>
      <Link to="/login">
        <LoginBtn>로그인</LoginBtn>
      </Link>
      <Link to="/signup">
        <JoinBtn>회원가입</JoinBtn>
      </Link>
    </ButtonBox>
  );
}
