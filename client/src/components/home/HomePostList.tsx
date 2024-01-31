import { Link } from 'react-router-dom';
import Avartar from '../common/Avartar';
import styled from '@emotion/styled';
import { IPost } from '../../types/types';
import { getAllPost } from '../../api/http';
import { useQuery } from 'react-query';

interface HomePostListProps {
  title: string;
  path: string;
}

export default function HomePostList({ title, path }: HomePostListProps) {
  const { data } = useQuery<IPost[]>(['HOME', title], getAllPost(path), {
    suspense: true,
  });

  const posts = data?.slice(0, 4);

  return (
    <Container>
      <ListBox>
        {posts?.map(
          ({ id, writerID, avartar, nickname, date, page, title }) => (
            <ListItem key={id}>
              <NicknameBox>
                <Link to={`/user/${writerID}/posts`}>
                  <Avartar
                    width="20px"
                    heigth="20px"
                    src={
                      avartar ||
                      'https://graph.facebook.com/555897032021233/picture?width=200&height=200'
                    }
                  />
                </Link>
                <Link to={`/user/${writerID}/posts`}>
                  <Nickname>{nickname}</Nickname>
                </Link>
                <ListDate>- {date}</ListDate>
              </NicknameBox>
              <ListTitle>
                <Link
                  to={path === '/guest-book' ? `/${page}` : `/${page}/${id}`}
                >
                  {title}
                </Link>
              </ListTitle>
            </ListItem>
          )
        )}
      </ListBox>
    </Container>
  );
}

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
