import { useRecoilValue } from 'recoil';
import { useGetAxios } from '../../hooks/api/http';
import { IArticleCommentData, IUserData } from '../../types';
import { category } from '../../atom';
import Avartar from '../common/Avartar';
import styled from '@emotion/styled';
import axios from 'axios';

const GuestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
  img {
    margin-bottom: 4px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteBtn = styled.button`
  background-color: none;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export default function GuestBookList() {
  const page = useRecoilValue(category);
  // 로그인 한 유저 정보
  const { data: loginUser } = useGetAxios<IUserData>('/user/login-info');

  // 게시물
  const { data, isLoading, error } = useGetAxios<IArticleCommentData[]>(
    `/article/${page}/all`
  );

  const handleClick = async (id: number) => {
    if (window.confirm('정말로 삭제하겠습니까?')) {
      await axios.delete(`/article/${id}`);
    }
    return;
  };

  return (
    <div>
      {data?.map(item => (
        <GuestContainer>
          <Box>
            <User>
              <Avartar width="30px" heigth="30px" src={item.avartar} />
              <span>{item.nickname}</span>
            </User>
            <span>{item.content}</span>
          </Box>
          <div>
            <DeleteBtn onClick={() => handleClick(item.id)}>삭제</DeleteBtn>
          </div>
        </GuestContainer>
      ))}
    </div>
  );
}
