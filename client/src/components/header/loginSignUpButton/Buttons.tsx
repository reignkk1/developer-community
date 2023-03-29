import { Link } from "react-router-dom";
import { Styles } from "./styles";

export default function LoginSignUpBtn() {
  return (
    <Styles.ButtonBox>
      <Link to="/login">
        <Styles.LoginBtn>로그인</Styles.LoginBtn>
      </Link>
      <Link to="/signup">
        <Styles.JoinBtn>회원가입</Styles.JoinBtn>
      </Link>
    </Styles.ButtonBox>
  );
}
