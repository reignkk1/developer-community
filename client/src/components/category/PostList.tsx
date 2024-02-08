import { Link, useSearchParams } from 'react-router-dom';
import * as router from 'react-router-dom';

// File
import { IPost } from '../../types/types';
import { getAllPost } from '../../api/http';
import styled from '@emotion/styled';
import Avartar from '../common/Avartar';
import { useQuery } from 'react-query';
import { Paginate } from 'react-url-paginate';

// =============================================================================

export default function PostList() {
  const { pathname } = router.useLocation();
  const section = pathname.split('/')[1];

  const { data } = useQuery<IPost[]>(
    ['POST_LIST', section],
    getAllPost(section),
    {
      suspense: true,
    }
  );

  const [query] = useSearchParams();
  const pageNumber = query.get('page');

  const posts = data?.slice(
    pageNumber === null ? 0 : Number(pageNumber) * 10 - 10,
    pageNumber === null ? 10 : Number(pageNumber) * 10
  );

  return (
    <>
      <ul>
        {posts?.map(({ id, writerID, avartar, title, date, nickname }) => (
          <ListItem key={id}>
            <NicknameBox>
              <Link to={`/user/${writerID}/posts`}>
                <Avartar width="20px" heigth="20px" src={avartar} />
              </Link>
              <Link to={`/user/${writerID}/posts`}>
                <Nickname>{nickname}</Nickname>
              </Link>
            </NicknameBox>

            <Link to={`/${section}/${id}`}>
              <ListTitle>{title}</ListTitle>
            </Link>

            <ListDate>{date}</ListDate>
          </ListItem>
        ))}
      </ul>
      <Paginate
        prevLabel="< 이전"
        nextLabel="다음 >"
        total={data?.length || 0}
        pageItems={10}
        router={router}
      />
    </>
  );
}

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
