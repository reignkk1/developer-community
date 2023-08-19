import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Avartar from '../common/Avartar';
import { IComment } from '../../types/types';
import useComment from './hook/useComment';
import Parser from 'html-react-parser';
import CommentWrite from './PostCommentWrite';
import PostReplyComment from './PostReplyComment';
import useLoginUser from '../../hooks/useLoginUser';

const Item = styled.li`
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding-bottom: 20px;
  margin-bottom: 40px;
`;
const WriteBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: grey;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    color: ${props => props.theme.textColor};
    &:hover {
      color: #0092fa;
    }
    margin-right: 10px;
  }
`;

const UserInfo = styled.div``;
const Nickname = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;
const Date = styled.div`
  font-size: 14px;
`;
const Text = styled.div`
  line-height: 2;
  @media (max-width: 940px) {
    font-size: 14px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 13px;
  &:hover {
    background-color: #0580d7;
  }
`;
const DeleteBtn = styled(Btn)`
  margin-right: 5px;
`;
const ModifyBtn = styled(Btn)`
  &:disabled {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
  &:focus {
    border: 1px solid #0580d7;
  }
`;

const CancleBtn = styled(Btn)`
  margin-right: 5px;
`;

interface IPostCommentItem {
  comment: IComment;
}

export default function PostCommentItem({ comment }: IPostCommentItem) {
  const loginUser = useLoginUser();

  const {
    clickCommentID,
    modifyInputValue,
    modify,
    onDelete,
    onModify,
    onModifyComplete,
    onCancle,
    onChange,
    handleToggleWrite,
    commentWrite,
    setCommentWrite,
  } = useComment();

  return (
    <Item key={comment.id}>
      <User>
        <Link to={`/user/${comment.writerID}/posts`}>
          <Avartar width="40px" heigth="40px" src={comment.avartar} />
        </Link>
        <UserInfo>
          <Link to={`/user/${comment.writerID}/posts`}>
            <Nickname>{comment.nickname}</Nickname>
          </Link>
          <Date>{comment.date}</Date>
        </UserInfo>
      </User>
      {modify && clickCommentID === comment.id ? (
        <Input
          onChange={onChange}
          defaultValue={comment.text.replace(/<\/?[^>]+(>|$)/g, '')}
        />
      ) : (
        <Text>{Parser(comment.text)}</Text>
      )}
      {loginUser && loginUser.id === comment.writerID ? (
        <BtnBox id={`${comment.id}`}>
          {modify && clickCommentID === comment.id ? (
            <>
              <CancleBtn onClick={onCancle}>취소</CancleBtn>
              <ModifyBtn
                onClick={() => onModifyComplete(comment.id)}
                disabled={
                  modifyInputValue === comment.text || modifyInputValue === ''
                    ? true
                    : false
                }
              >
                수정완료
              </ModifyBtn>
            </>
          ) : (
            <>
              <DeleteBtn onClick={() => onDelete(comment.id)}>삭제</DeleteBtn>
              <ModifyBtn onClick={() => onModify(comment.id)}>수정</ModifyBtn>
            </>
          )}
        </BtnBox>
      ) : null}

      {commentWrite && clickCommentID === comment.id ? (
        <WriteBtn onClick={() => handleToggleWrite(comment.id)}>
          댓글 취소
        </WriteBtn>
      ) : (
        <WriteBtn onClick={() => handleToggleWrite(comment.id)}>
          댓글 쓰기
        </WriteBtn>
      )}

      {commentWrite && clickCommentID === comment.id ? (
        <CommentWrite
          parentCommentID={comment.id}
          setCommentWrite={setCommentWrite}
          page={comment.page}
        />
      ) : null}
      <PostReplyComment parentID={comment.id} />
    </Item>
  );
}
