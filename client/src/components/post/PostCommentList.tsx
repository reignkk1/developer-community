// File
import { useParams } from 'react-router-dom';
import { ErrorBox, LoadingBox } from '../common/LoadingError';
import { IComment } from '../../types/types';
import { category } from '../../store/atom';
import { useRecoilValue } from 'recoil';
import { useGetAxios } from '../../hooks/api/http';
import PostCommentItem from './PostCommentItem';
import styled from '@emotion/styled';

// =============================================================================

const Container = styled.div`
  margin-top: 20px;
`;

const Count = styled.div`
  margin-bottom: 20px;
`;

export default function PostCommentList() {
  const { id } = useParams();
  const page = useRecoilValue(category);

  // 해당 게시물의 댓글들 Fetch
  const {
    data: comments,
    isLoading,
    error,
  } = useGetAxios<IComment[]>(`/article/${page}/${id}/comments`);

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <Container>
          <Count>{comments ? comments?.length : 0}개의 댓글</Count>
          {comments ? (
            <ul>
              {comments?.map(comment =>
                !comment.parentID ? (
                  <PostCommentItem key={comment.id} comment={comment} />
                ) : null
              )}
            </ul>
          ) : null}
        </Container>
      )}
    </>
  );
}
