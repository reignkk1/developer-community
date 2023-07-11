import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

// File
import QuoteInput from "../components/QuoteInput";
import { useRecoilValue } from "recoil";
import { loginUserInfoGet } from "../atom";

// =============================================================================

const Main = styled.main`
  width: 60%;
  height: 50vh;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

// =============================================================================

export default function QuoteEdit() {
  const loginUser = useRecoilValue(loginUserInfoGet);
  const [inputData, setInputData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/article/quote/${id}`)
      .then((response) => setInputData(response.data.result[0].title));
  }, [id]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const onClick = () => {
    axios
      .patch(`/article/quote/${id}`, {
        title: inputData,
      })
      .then(() => {
        navigate(`/quote/${id}`);
        alert("수정이 완료되었습니다!");
      });
  };
  return loginUser ? (
    <Main>
      <QuoteInput
        onChange={onChange}
        onClick={onClick}
        inputData={inputData}
        btnText="수정"
      />
    </Main>
  ) : (
    <Navigate to="/quote" />
  );
}
