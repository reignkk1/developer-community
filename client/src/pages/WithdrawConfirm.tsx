import styled from "@emotion/styled";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";

// File
import { logined } from "../atom";

// =============================================================================

const Main = styled.main`
  width: 450px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
`;
const LogoBox = styled.div`
  margin-bottom: 50px;
`;
const Logo = styled.img`
  width: 80px;
  margin-bottom: 30px;
`;

const P1 = styled.p`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${(props) => props.theme.textColor};
`;

const SignTextBox = styled.div`
  border: 0px solid rgba(0, 0, 0, 0.2);
  height: 180px;
  padding: 25px 10px;
  background-color: ${(props) => props.theme.bgTitleColor};
  border-radius: 5px;
`;
const SignText = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  line-height: 1.4;
  span {
    font-weight: bold;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const Btn = styled.button`
  width: 48%;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
`;
const CancelBtn = styled(Btn)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  &:hover {
    background-color: rgba(222, 221, 221, 0.2);
  }
`;
const DeleteBtn = styled(Btn)`
  background-color: #e40e0e;
  border: none;
  color: white;
  &:hover {
    background-color: #b91c1c;
  }
`;

// =============================================================================

export default function WithdrawConfirm() {
  const [loginState, setLogined] = useRecoilState(logined);
  const navigate = useNavigate();

  const onCancelClick = () => {
    navigate("/account");
  };

  const onDeleteClick = () => {
    axios.delete("/user").then(() => {
      setLogined(false);
      window.location.assign("/");
    });
  };

  return loginState ? (
    <Main>
      <LogoBox>
        <Link to="/">
          <Logo src="https://okky.kr/okky.svg" alt="로고" />
        </Link>
        <P1>회원 탈퇴 시 아래와 같이 처리됩니다.</P1>
      </LogoBox>
      <SignTextBox>
        <SignText>
          회원 탈퇴일로부터 계정과 닉네임을 포함한 계정
          정보(아이디/이메일/닉네임)는 개인정보 보호정책에 따라 60일간
          보관(잠김)되며,
          <br />
          <br />
          <span>60일 경과된 후에는</span>
          <br />
          <br />
          <span>
            모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다.
          </span>
        </SignText>
      </SignTextBox>
      <BtnBox>
        <CancelBtn onClick={onCancelClick}>취소</CancelBtn>
        <DeleteBtn onClick={onDeleteClick}>예, 탈퇴하겠습니다.</DeleteBtn>
      </BtnBox>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
