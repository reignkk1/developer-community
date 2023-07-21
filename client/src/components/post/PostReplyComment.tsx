import styled from '@emotion/styled';
import { IComment } from '../../../types/types';
import { useGetAxios } from '../../hooks/api/http';
import PostCommentItem from './PostCommentItem';

const Container = styled.div`
  margin-top: 20px;

  li {
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    border-bottom: none;
    padding-left: 15px;
  }
`;

interface IReplyComment {
  parentID: number;
}

export default function PostReplyComment({ parentID }: IReplyComment) {
  const { data: comments } = useGetAxios<IComment[]>(
    `/comment/children/${parentID}`
  );

  return comments?.length ? (
    <Container>
      {comments?.map(comment => (
        <PostCommentItem comment={comment} />
      ))}
    </Container>
  ) : null;
}
