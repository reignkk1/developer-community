import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

// File

import UserInfoContainer from "../components/UserInfoContainer";

// =============================================================================

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
const ItemPage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
`;
const Page = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);

  border-radius: 15px;
  font-size: 12px;
  margin-right: 5px;
  a {
    color: #0092fa;
    display: block;
    padding: 9px 10px;
  }
  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;
const Span = styled.span`
  font-weight: 500;
  opacity: 0.7;
`;
const ItemTitle = styled.div`
  a:hover {
    color: #0092fa;
  }
`;
const ItemDate = styled.div`
  font-weight: 500;
`;

// =============================================================================

interface IUserInfoPage {
  page: string;
}

interface IData {
  id: number;
  title: string;
  content: string;
  writerID: string;
  date: string;
  nickname: string;
  page: string;
  postID: number;
  text: string;
}

// =============================================================================

export default function UserInfo({ page }: IUserInfoPage) {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery<IData[]>(`user${page}`, () =>
    axios
      .get(`http://localhost:8000/user/${page}/${id}`)
      .then((response) => response.data)
  );

  return (
    <Main>
      <UserInfoContainer userId={id} nickName={data![0].nickname} />
      {page === "posts" ? (
        <ItemBox>
          {data?.map((item) => (
            <Item>
              <ItemTitle>
                <ItemPage>
                  <Page>
                    {item.page === "notice" ? (
                      <Link to="/notice">공지사항</Link>
                    ) : item.page === "question" ? (
                      <Link to="/question">QnA</Link>
                    ) : item.page === "life" ? (
                      <Link to="/life">사는얘기</Link>
                    ) : (
                      <Link to="/quote">명언</Link>
                    )}
                  </Page>
                  <Span>에 게시물을 작성하였습니다.</Span>
                </ItemPage>
                <Link to={`/${item.page}/${item.id}`}>{item.title}</Link>
              </ItemTitle>
              <ItemDate>{item.date}</ItemDate>
            </Item>
          ))}
        </ItemBox>
      ) : (
        <ItemBox>
          {data?.map((item) => (
            <Item>
              <ItemTitle>
                <ItemPage>
                  <Page>
                    {item.page === "notice" ? (
                      <Link to={`/notice/${item.postID}`}>공지사항</Link>
                    ) : item.page === "question" ? (
                      <Link to={`/question/${item.postID}`}>QnA</Link>
                    ) : item.page === "life" ? (
                      <Link to={`/life/${item.postID}`}>사는얘기</Link>
                    ) : (
                      <Link to={`/quote/${item.postID}`}>명언</Link>
                    )}
                  </Page>
                  <Span>에 댓글을 달았습니다.</Span>
                </ItemPage>
                <Link to={`/${item.page}/${item.postID}`}>{item.text}</Link>
              </ItemTitle>
              <ItemDate>{item.date}</ItemDate>
            </Item>
          ))}
        </ItemBox>
      )}
    </Main>
  );
}
