import styled from '@emotion/styled';
import { IPost } from '../../types/types';
import Avartar from '../common/Avartar';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { category } from '../../store/atom';

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

interface IPostListItem {
  post: IPost;
}

export default function PostListItem({ post }: IPostListItem) {
  const page = useRecoilValue(category);
  return (
    <ListItem key={post.id}>
      <NicknameBox>
        <Link to={`/user/${post.writerID}/posts`}>
          <Avartar width="20px" heigth="20px" src={post.avartar} />
        </Link>
        <Link to={`/user/${post.writerID}/posts`}>
          <Nickname>{post.nickname}</Nickname>
        </Link>
      </NicknameBox>

      <Link to={`/${page}/${post.id}`}>
        <ListTitle>{post.title}</ListTitle>
      </Link>

      <ListDate>{post.date}</ListDate>
    </ListItem>
  );
}
