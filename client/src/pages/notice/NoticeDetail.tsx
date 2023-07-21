import { useSetRecoilState } from 'recoil';
import PostDetail from '../../components/post/PostDetail';
import { category } from '../../store/atom';
import { useEffect } from 'react';
import { Main } from '../../styles/PageShareStyle';
import PostCommentWrite from '../../components/post/PostCommentWrite';
import PostCommentList from '../../components/post/PostCommentList';

export default function NoticeDetail() {
  const setPage = useSetRecoilState(category);

  useEffect(() => {
    setPage('notice');
  }, [setPage]);

  return (
    <Main>
      <PostDetail />
      <PostCommentWrite />
      <PostCommentList />
    </Main>
  );
}
