import { Link, useSearchParams } from 'react-router-dom';
import * as router from 'react-router-dom';

// File
import { IPost } from '../../types/types';
import { getAllPost } from '../../api/http';
import styled from '@emotion/styled';
import Avartar from '../common/Avartar';
import { useQuery } from 'react-query';
import { Paginate } from 'react-url-paginate';

const ListItem = styled.li`
  padding: 20px 0px;
  border-top: 1px solid ${props => props.theme.borderColor};
`;
const ListTitle = styled.div`
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 10px;
  color: ${props => props.theme.textColor};
  &:hover {
    color: #0092fa;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
`;

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    color: ${props => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    margin-right: 5px;
  }
`;

const Nickname = styled.div`
  font-size: 14px;
  margin-right: 7px;
`;

// =============================================================================

export default function PostList() {
  // 모든 게시물 가져오기
  const { pathname } = router.useLocation();
  const section = pathname.split('/')[1];

  const { data: posts } = useQuery<IPost[]>(
    ['POST_LIST', section],
    getAllPost(section),
    {
      suspense: true,
    }
  );
  // URL 쿼리에 담긴 Page 데이터 가져옴
  const [query] = useSearchParams();
  const pageCount = query.get('page');

  return (
    <>
      <ul>
        {posts
          ?.slice(
            // 한 페이지당 10개의 게시물을 보여줌
            pageCount === null ? 0 : Number(pageCount) * 10 - 10,
            pageCount === null ? 10 : Number(pageCount) * 10
          )
          .map(post => (
            <ListItem key={post.id}>
              <NicknameBox>
                <Link to={`/user/${post.writerID}/posts`}>
                  <Avartar width="20px" heigth="20px" src={post.avartar} />
                </Link>
                <Link to={`/user/${post.writerID}/posts`}>
                  <Nickname>{post.nickname}</Nickname>
                </Link>
              </NicknameBox>

              <Link to={`/${section}/${post.id}`}>
                <ListTitle>{post.title}</ListTitle>
              </Link>

              <ListDate>{post.date}</ListDate>
            </ListItem>
          ))}
      </ul>
      <Paginate total={100} pageItems={10} router={router} />
    </>
  );
}
