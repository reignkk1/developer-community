// File
import { useParams } from 'react-router-dom';
import { IComment, IPage } from '../../types/types';
import PostCommentItem from './PostCommentItem';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getComments } from '../../api/http';

// =============================================================================

const Container = styled.div`
  margin-top: 20px;
`;

const Count = styled.div`
  margin-bottom: 20px;
`;

export default function PostCommentList({ page }: IPage) {
  const { id } = useParams();

  // 해당 게시물의 댓글들 Fetch
  const { data: comments } = useQuery<IComment[]>(
    ['comments', `PostId: ${id}`],
    getComments(page, id),
    { suspense: true }
  );

  return (
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
  );
}
