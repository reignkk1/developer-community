// File
import { IComment } from '../../types/types';
import PostCommentItem from './PostCommentItem';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getComments } from '../../api/http';
import PostReplyComment from './PostReplyComment';

// =============================================================================

const Container = styled.div`
  margin-top: 20px;
`;

const Count = styled.div`
  margin-bottom: 20px;
`;

export default function PostCommentList({
  section,
  id,
}: {
  section: string;
  id: string;
}) {
  // 해당 게시물의 댓글들 Fetch
  const { data: comments } = useQuery<IComment[]>(
    ['comments', `PostId: ${id}`],
    getComments(section, id),
    { suspense: true }
  );

  return (
    <Container>
      <Count>{comments ? comments?.length : 0}개의 댓글</Count>
      {comments ? (
        <ul>
          {comments?.map(comment =>
            !comment.parentID ? (
              <>
                <PostCommentItem key={comment.id} comment={comment} />
                <PostReplyComment parentID={comment.id} />
              </>
            ) : null
          )}
        </ul>
      ) : null}
    </Container>
  );
}
