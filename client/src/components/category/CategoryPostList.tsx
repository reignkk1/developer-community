import { useSearchParams } from 'react-router-dom';

// File
import { IPost } from '../../../types/types';
import { ErrorBox, LoadingBox } from '../common/LoadingError';
import PageNumberBar from '../common/pageNumBar';
import { useGetAxios } from '../../hooks/api/http';
import { useRecoilValue } from 'recoil';
import { category } from '../../store/atom';
import PostListItem from './CategoryPostListItem';

// =============================================================================

export default function PostList() {
  const page = useRecoilValue(category);
  // 모든 게시물 가져오기
  const { data, isLoading, error } = useGetAxios<IPost[]>(
    `/article/${page}/all`
  );

  // URL 쿼리에 담긴 Page 데이터 가져옴
  const [query] = useSearchParams();
  const pageCount = query.get('page');

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox />
  ) : (
    <>
      <ul>
        {data
          ?.slice(
            // 한 페이지당 10개의 게시물을 보여줌
            pageCount === null ? 0 : Number(pageCount) * 10 - 10,
            pageCount === null ? 10 : Number(pageCount) * 10
          )
          .map(post => (
            <PostListItem post={post} />
          ))}
      </ul>

      <PageNumberBar dataLength={data?.length} pageCount={pageCount} />
    </>
  );
}
