/** @jsxImportSource @emotion/react */
import { Link, useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

//File

import Parser from "html-react-parser";
import { ErrorBox, LoadingBox } from "../components/common/LoadingError";
import PageNumberBar from "../components/common/pageNumBar";
import { IArticleCommentData } from "../types";

import Avartar from "../components/common/Avartar";
import { useGetAxios } from "../hooks/api/http";

// =============================================================================

const Main = css`
  width: 1000px;
  margin: 0 auto;
  @media (max-width: 1040px) {
    width: 80%;
  }
`;

const SearchKeyword = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Info = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    margin-right: 5px;
  }
  a:first-of-type {
    margin-right: 10px;
  }
`;

const Title = (theme: ITheme) => css`
  a {
    color: ${theme.textColor};
    &:hover {
      color: #0092fa;
    }
    line-height: 1.4;
  }
  @media (max-width: 1040px) {
    font-size: 15px;
  }
`;

const Nickname = (theme: ITheme) => css`
  color: ${theme.textColor};
  &:hover {
    color: #0092fa;
  }
`;
const ItemList = (theme: ITheme) => css`
  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: 30px;
  margin-top: 10px;
`;

// =============================================================================

interface ITheme {
  borderColor: string;
  textColor: string;
}

// =============================================================================

export default function Search() {
  const theme = useTheme();
  const [search] = useSearchParams();
  const keyword = search.get("keyword");

  const { data, isLoading, error } = useGetAxios<IArticleCommentData[]>(
    `/search?keyword=${keyword}`
  );

  const [query] = useSearchParams();
  const pageCount = query.get("page");

  return (
    <main css={Main}>
      <div css={SearchKeyword}>검색어 : {keyword}</div>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <ul>
          {data
            ?.slice(
              pageCount === null ? 0 : Number(pageCount) * 10 - 10,
              pageCount === null ? 10 : Number(pageCount) * 10
            )
            .map((item) => (
              <li key={item.id} css={ItemList(theme)}>
                <div css={Info}>
                  <Link to={`/user/${item.writerID}/posts`}>
                    <Avartar width="30px" heigth="30px" src={item.avartar} />
                  </Link>
                  <Link to={`/user/${item.writerID}/posts`}>
                    <span css={Nickname(theme)}>{item.nickname}</span>
                  </Link>
                  <span>|</span>
                  <span>{item.date}</span>
                </div>
                <div css={Title(theme)}>
                  <Link to={`/${item.page}/${item.id}`}>
                    {Parser(
                      `${item.title.replaceAll(
                        `${keyword}`,
                        `<mark style='background-color: #b2ddfc; font-weight:bold'>${keyword}</mark>`
                      )}`
                    )}
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      )}
      <PageNumberBar
        dataLength={data?.length}
        pageCount={pageCount}
        keyword={keyword}
      />
    </main>
  );
}
