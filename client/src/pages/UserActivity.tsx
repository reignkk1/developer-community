import styled from "@emotion/styled";
import { Link, useParams, useSearchParams } from "react-router-dom";

// File

import PageNumberBar from "../components/common/pageNumBar";
import UserInfoContainer from "../components/userActivity/UserInfoContainer";
import { Main } from "../styles/PageShareStyle";
import { IActivityPage, IArticleCommentData } from "../types";
import { useGetAxios } from "../hooks/api/http";

// =============================================================================

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
    font-size: 13px;
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
    @media (max-width: 940px) {
      font-size: 14px;
    }
  }
`;
const ItemDate = styled.div`
  font-weight: 500;
  @media (max-width: 940px) {
    font-size: 13px;
  }
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

export default function UserActivity({ page }: IActivityPage) {
  const { id } = useParams();

  const { data, isLoading, error } = useGetAxios<IArticleCommentData[]>(
    `/user/${page}/${id}`
  );

  const [query] = useSearchParams();
  const pageCount = query.get("page");

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
              pageCount === null ? 0 : Number(pageCount) * 10 - 10,
              pageCount === null ? 10 : Number(pageCount) * 10
            )
            .map((item) => (
              <Item key={item.id}>
                <ItemTitle>
                  <ItemPage>
                    <Page>
                      {item.page === "notice" ? (
                        <Link to="/notice">공지사항</Link>
                      ) : item.page === "tech" ? (
                        <Link to="/tech">Tech</Link>
                      ) : item.page === "life" ? (
                        <Link to="/life">사는얘기</Link>
                      ) : (
                        <Link to="/guest-book">방명록</Link>
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
              pageCount === null ? 0 : Number(pageCount) * 10 - 10,
              pageCount === null ? 10 : Number(pageCount) * 10
            )
            .map((item) => (
              <Item key={item.id}>
                <ItemTitle>
                  <ItemPage>
                    <Page>
                      {item.page === "notice" ? (
                        <Link to={`/notice/${item.postID}`}>공지사항</Link>
                      ) : item.page === "tech" ? (
                        <Link to={`/tech/${item.postID}`}>Tech</Link>
                      ) : item.page === "life" ? (
                        <Link to={`/life/${item.postID}`}>사는얘기</Link>
                      ) : (
                        <Link to={`/guest-book/${item.postID}`}>방명록</Link>
                      )}
                    </Page>
                    <Span>에 댓글을 달았습니다.</Span>
                  </ItemPage>
                  <Link to={`/${item.page}/${item.postID}`}>
                    {item.text?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Link>
                </ItemTitle>
                <ItemDate>{item.date}</ItemDate>
              </Item>
            ))}
        </ItemBox>
      )}
      <PageNumberBar
        dataLength={data?.length}
        pageCount={pageCount}
        userID={id}
      />
    </Main>
  );
}
