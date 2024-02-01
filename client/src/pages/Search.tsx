import { useSearchParams } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

//File

import SearchPostList from '../components/search/SearchPostList';
import useActiveSection from '../hooks/useActiveSection';
import AsyncSuspense from '../components/AsyncSuspense';

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

// =============================================================================

export default function Search() {
  const [search] = useSearchParams();
  const keyword = search.get('keyword');

  useActiveSection();

  return (
    <main css={Main}>
      <div css={SearchKeyword}>검색어 : {keyword}</div>
      <AsyncSuspense>
        <SearchPostList keyword={keyword || ''} />
      </AsyncSuspense>
    </main>
  );
}
