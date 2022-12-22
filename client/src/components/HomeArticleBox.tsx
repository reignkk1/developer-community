import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IArticle, IData } from "../interface";

const Container = styled.div`
  height: 480px;
`;

const ListBox = styled.ul`
  padding: 5px;
`;
const ListItem = styled.li`
  padding: 15px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const ListTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  opacity: 0.9;
  a {
    &:hover {
      color: #0092fa;
    }
    display: block;
    width: 410px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
`;

const Title = styled.div`
  background-color: #e8eef1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  &:hover {
    color: #0092fa;
  }
  height: 70px;
`;
const Img = styled.img`
  width: 40%;
  height: 80px;
`;
const TitleName = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

export default function ArticleBox({ ImgeSrc, name, page }: IArticle) {
  const [data, setData] = useState<IData[]>();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${page}`)
      .then((response) => setData(response.data));
  }, []);

  return (
    <Container>
      <Link to={`/${page}`}>
        <Title>
          <TitleName>{name}</TitleName>
          <Img src={ImgeSrc} />
        </Title>
      </Link>
      <ListBox>
        {data?.slice(0, 5).map((item) => (
          <ListItem>
            <ListTitle>
              <Link to={`/${page}/${item.id}`}>{item.title}</Link>
            </ListTitle>
            <ListDate>{item.date}</ListDate>
          </ListItem>
        ))}
      </ListBox>
    </Container>
  );
}
