/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import Parser from 'html-react-parser';
import { useQuery } from 'react-query';
import { IPost } from '../../types/types';
import { getSearchResult } from '../../api/http';
import { Link } from 'react-router-dom';
import Avartar from '../common/Avartar';
import { Paginate } from 'react-url-paginate';
import * as router from 'react-router-dom';

interface ITheme {
  borderColor: string;
  textColor: string;
}

interface ISearchPostList {
  keyword: string;
  pageNumber: string;
}

export default function SearchPostList({
  keyword,
  pageNumber,
}: ISearchPostList) {
  const theme = useTheme();

  const { data } = useQuery<IPost[]>(
    ['search', keyword],
    getSearchResult(keyword),
    { suspense: true }
  );
  const posts = data?.slice(
    pageNumber === null ? 0 : Number(pageNumber) * 10 - 10,
    pageNumber === null ? 10 : Number(pageNumber) * 10
  );

  const markingTitleKeyword = (title: string) => {
    return Parser(
      title.replaceAll(
        keyword,
        `<mark style='background-color: #b2ddfc; font-weight:bold'>${keyword}</mark>`
      )
    );
  };

  return (
    <>
      <ul>
        {posts?.map(
          ({ id, writerID, avartar, nickname, date, page, title }) => (
            <li key={id} css={ItemList(theme)}>
              <div css={Info}>
                <Link to={`/user/${writerID}/posts`}>
                  <Avartar width="30px" heigth="30px" src={avartar} />
                </Link>
                <Link to={`/user/${writerID}/posts`}>
                  <span css={Nickname(theme)}>{nickname}</span>
                </Link>
                <span>|</span>
                <span>{date}</span>
              </div>
              <div css={Title(theme)}>
                <Link to={`/${page}/${id}`}>{markingTitleKeyword(title)}</Link>
              </div>
            </li>
          )
        )}
      </ul>
      <Paginate
        prevLabel="< 이전"
        nextLabel="다음 >"
        total={data?.length || 0}
        pageItems={10}
        router={router}
      />
    </>
  );
}

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
