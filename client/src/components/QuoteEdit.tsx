import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

// File
import QuoteInput from "./QuoteInput";

// =============================================================================

const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;

// =============================================================================

export default function QuoteEdit() {
  const [inputData, setInputData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/quote/${id}`)
      .then((response) => setInputData(response.data[0].title));
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const onClick = () => {
    axios
      .patch(`http://localhost:8000/quote/${id}`, {
        title: inputData,
      })
      .then(() => {
        alert("수정이 완료되었습니다!");
      })
      .then(() => navigate(`/quote/${id}`));
  };
  return (
    <Main>
      <QuoteInput onChange={onChange} onClick={onClick} inputData={inputData} />
    </Main>
  );
}
