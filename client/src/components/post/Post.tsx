import { Link, useNavigate } from 'react-router-dom';
import Parser from 'html-react-parser';

// File
import Button from '../common/button';
import Avartar from '../common/Avartar';
import { getPost } from '../../api/http';
import styled from '@emotion/styled';
import useLoginUser from '../../hooks/useLoginUser';
import { useMutation, useQuery } from 'react-query';
import { deletePost } from '../../api/http';
import { IPost } from '../../types/types';
import PostCommentWrite from './PostCommentWrite';
import Head from '../Head';

const ArticleContainer = styled.div`
  padding: 40px 0px;
  border-top: 1px solid ${props => props.theme.borderColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 30px;
`;

const ArticleTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 80px;
  @media (max-width: 940px) {
    font-size: 19px;
    line-height: 1.4;
  }
`;
const ArticleText = styled.div`
  blockquote {
    border-left: 4px solid #0092fa;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }
  img {
    cursor: default !important;
  }
  font-size: 16px;
  line-height: 2;
  @media (max-width: 940px) {
    font-size: 15px;
  }
`;

const ButtonBox = styled.div`
  button {
    margin-right: 10px;
  }
`;
const UserBox = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  a {
    margin-right: 10px;
  }
`;

const NicknameBox = styled.div`
  a {
    display: block;
    color: ${props => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
  }
`;
const Nickname = styled.div`
  margin-bottom: 5px;
`;
const Date = styled.div`
  font-size: 14px;
`;

// =============================================================================

export default function Post({ section, id }: { section: string; id: string }) {
  const navigate = useNavigate();

  // 로그인 한 유저 정보
  const loginUser = useLoginUser();

  // 게시물
  const { data: post } = useQuery<IPost>(['postDetail', id], getPost(id), {
    suspense: true,
  });

  const { mutate: deleteMutate } = useMutation(deletePost(id), {
    onSuccess: () => navigate(`/${section}`),
  });

  const deleteClick = () => {
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      deleteMutate();
    } else {
      return;
    }
  };
  const editClick = () => navigate('edit');

  return (
    <>
      <Head title={post?.title || ''} />
      <ArticleContainer>
        <UserBox>
          <Link to={`/user/${post?.writerID}/posts`}>
            <Avartar width="50px" heigth="50px" src={post?.avartar} />
          </Link>
          <NicknameBox>
            <Link to={`/user/${post?.writerID}/posts`}>
              <Nickname>{post?.nickname}</Nickname>
            </Link>
            <Date>{post?.date}</Date>
          </NicknameBox>
        </UserBox>
        <ArticleTitle>{post?.title}</ArticleTitle>
        <ArticleText className="ql-editor">
          {Parser(post?.content || '')}
        </ArticleText>
      </ArticleContainer>

      {loginUser?.id === post?.writerID ? (
        <ButtonBox>
          <Button onClick={deleteClick}>삭제</Button>
          <Button onClick={editClick}>수정</Button>
        </ButtonBox>
      ) : null}

      <PostCommentWrite section={section} />
    </>
  );
}
