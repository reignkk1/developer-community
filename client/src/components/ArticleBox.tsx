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

const ListBox = styled.ul``;

const ListItem = styled.li`
  padding: 10px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const ListTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`;

const ListDate = styled.div`
  opacity: 0.9;
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
      <ListBox>
        {data?.map((item) => (
          <ListItem>
            <ListTitle>
              <Link to={`${href}/${item.id}`}>{item.title}</Link>
            </ListTitle>
            <ListDate>{item.date}</ListDate>
          </ListItem>
        ))}
      </ListBox>
    </Container>
  );
}
