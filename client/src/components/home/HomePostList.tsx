import { Link } from 'react-router-dom';

// File
import { IPost } from '../../types/types';
import Avartar from '../common/Avartar';
import { getAllPost, getFetch } from '../../api/http';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';

const Container = styled.div`
  height: 500px;
`;
const ListBox = styled.ul`
  padding: 5px;
`;
const ListItem = styled.li`
  padding: 15px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const ListTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  opacity: 0.9;

  a {
    display: block;
    height: 20px;
    color: ${props => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    display: block;
    width: 410px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const ListDate = styled.div`
  opacity: 0.9;
  font-size: 13px;
`;

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Nickname = styled.div`
  font-size: 14px;
  margin-left: 5px;
  margin-right: 7px;
  color: ${props => props.theme.textColor};

  &:hover {
    color: #0092fa;
  }
`;

interface HomePostListProps {
  routeTree: { title: string; section: string };
}

// =============================================================================

export default function HomePostList({
  routeTree: { title, section },
}: HomePostListProps) {
  const { data: posts } = useQuery<IPost[]>(
    ['HOME', section],
    getAllPost(section),
    {
      suspense: true,
    }
  );

  return (
    <Container>
      <ListBox>
        {posts?.slice(0, 4).map(post => (
          <ListItem key={post.id}>
            <NicknameBox>
              <Link to={`/user/${post.writerID}/posts`}>
                <Avartar
                  width="20px"
                  heigth="20px"
                  src={
                    post.avartar ||
                    'https://graph.facebook.com/555897032021233/picture?width=200&height=200'
                  }
                />
              </Link>
              <Link to={`/user/${post.writerID}/posts`}>
                <Nickname>{post.nickname}</Nickname>
              </Link>
              <ListDate>- {post.date}</ListDate>
            </NicknameBox>
            <ListTitle>
              <Link
                to={
                  section === 'guest-book'
                    ? `/${post.page}`
                    : `/${post.page}/${post.id}`
                }
              >
                {post.title}
              </Link>
            </ListTitle>
          </ListItem>
        ))}
      </ListBox>
    </Container>
  );
}
