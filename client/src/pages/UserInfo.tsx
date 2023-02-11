import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IArticleData } from "../interface";
import UserInfoContainer from "../components/UserInfoContainer";
import { IComment } from "./../interface";

const Main = styled.main`
  width: 800px;
  height: 1000px;
  margin: 0 auto;
`;

const ItemBox = styled.ul`
  margin-top: 70px;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;
const ItemTitle = styled.div``;
const ItemDate = styled.div``;

interface IUserInfoPage {
  page: string;
}

export default function UserInfo({ page }: IUserInfoPage) {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery<[]>(`user${page}`, () =>
    axios
      .get(`http://localhost:8000/user/${page}/${id}`)
      .then((response) => response.data)
  );
  console.log(data);

  return (
    <Main>
      <UserInfoContainer userId={id} />
      {page === "article" ? (
        <ItemBox>
          {data?.map((item: []) =>
            item.map((item: IArticleData) => (
              <Item>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDate>{item.date}</ItemDate>
              </Item>
            ))
          )}
        </ItemBox>
      ) : (
        <ItemBox>
          {data?.map((item: IComment) => (
            <Item>
              <ItemTitle>{item.text}</ItemTitle>
              <ItemDate>{item.date}</ItemDate>
            </Item>
          ))}
        </ItemBox>
      )}
    </Main>
  );
}
