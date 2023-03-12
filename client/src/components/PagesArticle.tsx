import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { articleGet } from "../axios";
import { useSetRecoilState } from "recoil";
import { logined } from "../atom";

// File
import { IArticleData, IPage } from "../interface";
import { ErrorBox, LoadingBox } from "./LoadingError";
import PageNumberBar from "./pageNumBar";
import { useState } from "react";
import { useEffect } from "react";
import Avartar from "./Avartar";

// =============================================================================

const ListBox = styled.ul``;
const ListItem = styled.li`
  padding: 20px 0px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;
const ListTitle = styled.div`
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: #0092fa;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
`;

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    margin-right: 5px;
  }
`;

const Nickname = styled.div`
  font-size: 14px;
  margin-right: 7px;
`;

// =============================================================================

export default function PagesArticle({ page }: IPage) {
  const setLoginState = useSetRecoilState(logined);
  const { isLoading, error, data } = useQuery<IArticleData[]>(`${page}`, () =>
    articleGet(page).then((response) => {
      if (response.data.logined) {
        setLoginState(true);
        return response.data.result;
      }
      setLoginState(false);
      return response.data.result;
    })
  );

  const [query] = useSearchParams();
  const pageCount = query.get("page");

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setPageNumber(Number(pageCount));
  }, [pageCount]);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox />
  ) : (
    <>
      <ListBox>
        {data
          ?.slice(
            pageCount === null ? 0 : pageNumber * 10 - 10,
            pageCount === null ? 10 : pageNumber * 10
          )
          .map((item) => (
            <ListItem key={item.id}>
              <NicknameBox>
                <Link to={`/user/${item.writerID}/posts`}>
                  <Avartar width="20px" heigth="20px" />
                </Link>
                <Link to={`/user/${item.writerID}/posts`}>
                  <Nickname>{item.nickname}</Nickname>
                </Link>
              </NicknameBox>
              <Link to={`/${page}/${item.id}`}>
                <ListTitle>{item.title}</ListTitle>
              </Link>
              <ListDate>{item.date}</ListDate>
            </ListItem>
          ))}
      </ListBox>
      <PageNumberBar
        dataLength={data?.length}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
}
