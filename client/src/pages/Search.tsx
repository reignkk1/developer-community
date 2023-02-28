/** @jsxImportSource @emotion/react */
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

//File
import { IArticleData } from "../interface";
import Parser from "html-react-parser";
import { useQuery } from "react-query";
import { ErrorBox, LoadingBox } from "../components/LoadingError";

// =============================================================================

const Main = css`
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
`;

const SearchKeyword = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Avartar = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Info = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    margin-right: 5px;
  }
  a:first-child {
    margin-right: 10px;
  }
`;

const Title = (theme: ITheme) => css`
  a {
    color: ${theme.textColor};
    &:hover {
      color: #0092fa;
    }
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

  const { isLoading, data, error } = useQuery<IArticleData[]>(
    `[searchKeyword,${keyword}]`,
    () =>
      axios.get(`/search?keyword=${keyword}`).then((response) => response.data)
  );

  return (
    <main css={Main}>
      <div css={SearchKeyword}>검색어 : {keyword}</div>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <ul>
          {data?.map((item) => (
            <li css={ItemList(theme)}>
              <div css={Info}>
                <Link to={`/user/${item.writerID}/posts`}>
                  <img
                    css={Avartar}
                    src="https://graph.facebook.com/555897032021233/picture?width=100&height=100"
                  />
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
    </main>
  );
}