import { useRecoilValue } from 'recoil';
import { useGetAxios } from '../../hooks/api/http';
import { ILoginUserProp, IPost } from '../../types/types';
import { category } from '../../store/atom';
import Avartar from '../common/Avartar';
import styled from '@emotion/styled';
import axios from 'axios';
import { PAGE_GUSET_BOOK } from '../../types/constant';

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
  border: 1px solid rgba(95, 30, 30, 0.2);
  cursor: pointer;
`;

export default function GuestBookList({ ...props }) {
  // 게시물
  const { data: posts } = useGetAxios<IPost[]>(
    `/article/${PAGE_GUSET_BOOK}/all`
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하겠습니까?')) {
      await axios.delete(`/article/${id}`);
    }
    return;
  };

  return (
    <div>
      {posts?.map(post => (
        <GuestContainer key={post.id}>
          <Box>
            <User>
              <Avartar width="30px" heigth="30px" src={post.avartar} />
              <span>{post.nickname}</span>
            </User>
            <span>{post.content}</span>
          </Box>
          {props.loginUser?.id && post.writerID ? (
            <div>
              <DeleteBtn onClick={() => handleDelete(post.id)}>삭제</DeleteBtn>
            </div>
          ) : null}
        </GuestContainer>
      ))}
    </div>
  );
}
