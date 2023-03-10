import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PageNumberBar from "../components/pageNumBar";

// File

import UserInfoContainer from "../components/UserInfoContainer";
import { useEffect } from "react";
import { useState } from "react";

// =============================================================================

const Main = styled.main`
  width: 800px;
  height: 230vh;
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
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  font-weight: bold;
`;
const ItemPage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
`;
const Page = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 15px;
  font-size: 12px;
  margin-right: 5px;

  a {
    display: block;
    padding: 9px 10px;
    color: #0092fa;
  }
  &:hover {
    border-color: ${(props) => props.theme.borderHoverColor};
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
  a {
    color: ${(props) => props.theme.textColor};
  }
`;
const ItemDate = styled.div`
  font-weight: 500;
`;

const Loading = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const { isLoading, data, error } = useQuery<IData[]>(
    `[user${page},${id}]`,
    () => axios.get(`/user/${page}/${id}`).then((response) => response.data)
  );

  const [query] = useSearchParams();
  const pageCount = query.get("page");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setPageNumber(Number(pageCount));
  }, [pageCount]);

  return (
    <Main>
      <UserInfoContainer userId={id} />
      {isLoading ? (
        <Loading>
          <img src="/img/loading.gif" alt="로딩중" />
        </Loading>
      ) : error ? (
        <Error>404 Not Found</Error>
      ) : page === "posts" ? (
        <ItemBox>
          {data
            ?.slice(
              pageCount === null ? 0 : pageNumber * 10 - 10,
              pageCount === null ? 10 : pageNumber * 10
            )
            .map((item) => (
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
          {data
            ?.slice(
              pageCount === null ? 0 : pageNumber * 10 - 10,
              pageCount === null ? 10 : pageNumber * 10
            )
            .map((item) => (
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
                  <Link to={`/${item.page}/${item.postID}`}>
                    {item.text.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Link>
                </ItemTitle>
                <ItemDate>{item.date}</ItemDate>
              </Item>
            ))}
        </ItemBox>
      )}
      <PageNumberBar
        dataLength={data?.length}
        page={page}
        pageCount={pageCount}
        userID={id}
      />
    </Main>
  );
}
