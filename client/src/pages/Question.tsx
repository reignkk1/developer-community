import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import PagesArticle from "../components/PagesArticle";
import PagesTitle from "../components/PagesTitle";
import { props } from "../interface";
const Main = styled.main`
  width: 60%;
  margin: 0 auto;
`;
export default function Questions() {
  const navigate = useNavigate();
  const onClick = () => navigate("write");
  return (
    <Main>
      <PagesTitle
        name={props.name.question}
        ImgeSrc={props.ImgeSrc.question}
        explain="좋은 질문과 답변으로 동료의 시간을 아껴주세요."
      />
      <Button onClick={onClick} text="✏️질문하기" />
      <PagesArticle page={props.page.question} />
    </Main>
  );
}
