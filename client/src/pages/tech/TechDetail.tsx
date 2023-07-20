import { useSetRecoilState } from 'recoil';
import PostDetail from '../../components/post/PostDetail';
import { category } from '../../atom';
import { useEffect } from 'react';
import PostCommentWrite from '../../components/post/PostCommentWrite';
import PostCommentList from '../../components/post/PostCommentList';
import { Main } from '../../styles/PageShareStyle';

export default function TechDetail() {
  const setPage = useSetRecoilState(category);

  useEffect(() => {
    setPage('tech');
  }, [setPage]);

  return (
    <Main>
      <PostDetail />
      <PostCommentWrite />
      <PostCommentList />
    </Main>
  );
}
