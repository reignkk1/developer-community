import { Link, useNavigate, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';
import { useRecoilValue } from 'recoil';

// File
import Button from '../common/button';
import { IPost, IUser } from '../../types/types';
import { ErrorBox, LoadingBox } from '../common/LoadingError';
import Avartar from '../common/Avartar';
import { category } from '../../store/atom';
import { useDeleteAxios, useGetAxios } from '../../hooks/api/http';
import styled from '@emotion/styled';

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

export default function PostDetail() {
  const navigate = useNavigate();
  const currentCategory = useRecoilValue(category);

  // URL 파라미터 ID값
  const { id } = useParams();

  // 로그인 한 유저 정보
  const { data: loginUser } = useGetAxios<IUser>('/user/login-info');

  // 게시물
  const { data, isLoading, error } = useGetAxios<IPost>(`/article/${id}`);

  const onSuccess = () => navigate(`/${currentCategory}`);

  const { mutate: deletePost } = useDeleteAxios(`/article/${id}`, onSuccess);

  const deleteClick = () => {
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      deletePost();
    } else {
      return;
    }
  };
  const editClick = () => navigate('edit');

  return (
    <>
      <ArticleContainer>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox />
        ) : (
          <>
            <UserBox>
              <Link to={`/user/${data?.writerID}/posts`}>
                <Avartar width="50px" heigth="50px" src={data?.avartar} />
              </Link>
              <NicknameBox>
                <Link to={`/user/${data?.writerID}/posts`}>
                  <Nickname>{data?.nickname}</Nickname>
                </Link>
                <Date>{data?.date}</Date>
              </NicknameBox>
            </UserBox>
            <ArticleTitle>{data?.title}</ArticleTitle>
            <ArticleText>{Parser(data?.content || '')}</ArticleText>
          </>
        )}
      </ArticleContainer>

      {loginUser?.id === data?.writerID ? (
        <ButtonBox>
          <Button onClick={deleteClick}>삭제</Button>
          <Button onClick={editClick}>수정</Button>
        </ButtonBox>
      ) : null}
    </>
  );
}
