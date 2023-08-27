import { css, useTheme } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import Parser from 'html-react-parser';
import PageNumberBar from './../common/pageNumBar';
import { useQuery } from 'react-query';
import { IPost } from '../../types/types';
import { getSearchResult } from '../../api/http';
import { Link, useSearchParams } from 'react-router-dom';
import Avartar from '../common/Avartar';

interface ITheme {
  borderColor: string;
  textColor: string;
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

interface ISearchPostList {
  keyword: string;
}

export default function SearchPostList({ keyword }: ISearchPostList) {
  const theme = useTheme();
  const [query] = useSearchParams();
  const pageCount = query.get('page');

  const { data: posts } = useQuery<IPost[]>(
    ['search', keyword],
    getSearchResult(keyword),
    { suspense: true }
  );

  return (
    <>
      <ul>
        {posts
          ?.slice(
            pageCount === null ? 0 : Number(pageCount) * 10 - 10,
            pageCount === null ? 10 : Number(pageCount) * 10
          )
          .map(post => (
            <li key={post.id} css={ItemList(theme)}>
              <div css={Info}>
                <Link to={`/user/${post.writerID}/posts`}>
                  <Avartar width="30px" heigth="30px" src={post.avartar} />
                </Link>
                <Link to={`/user/${post.writerID}/posts`}>
                  <span css={Nickname(theme)}>{post.nickname}</span>
                </Link>
                <span>|</span>
                <span>{post.date}</span>
              </div>
              <div css={Title(theme)}>
                <Link to={`/${post.page}/${post.id}`}>
                  {Parser(
                    `${post.title.replaceAll(
                      `${keyword}`,
                      `<mark style='background-color: #b2ddfc; font-weight:bold'>${keyword}</mark>`
                    )}`
                  )}
                </Link>
              </div>
            </li>
          ))}
      </ul>

      <PageNumberBar
        dataLength={posts?.length}
        pageCount={pageCount}
        keyword={keyword}
        page="search"
      />
    </>
  );
}
