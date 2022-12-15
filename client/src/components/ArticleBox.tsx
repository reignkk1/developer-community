import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { IArticle } from "../interface";

const Container = styled.div``;
const Title = styled.div`
  background-color: #e8eef1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
`;
const Img = styled.img`
  width: 40%;
  height: 80px;
`;
const TitleName = styled.div`
  font-weight: bold;
`;

export default function ArticleBox({ type, name, href, data }: IArticle) {
  return (
    <Container>
      <Link to={href}>
        <Title>
          <TitleName>{name}</TitleName>
          <Img src={type} />
        </Title>
      </Link>
      {data?.map((item) => (
        <ul>
          <li>
            <div>{item.title}</div>
            <div>{item.date}</div>
          </li>
        </ul>
      ))}
    </Container>
  );
}
