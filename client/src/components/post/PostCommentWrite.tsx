import { Link, useParams } from 'react-router-dom';
import { useState, Dispatch, SetStateAction } from 'react';

// File
import Avartar from '../common/Avartar';
import { useMutation, useQueryClient } from 'react-query';
import styled from '@emotion/styled';
import useLoginUser from '../../hooks/useLoginUser';
import { ISection } from '../../types/types';
import { DateToday } from '../../utils/DateToday';
import { createComment } from '../../api/http';
import ReactEditor from '../common/Editor';

const Container = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 10px;
  padding: 30px;
  margin-top: 50px;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50%;
  position: relative;
  margin-bottom: 30px;
`;
const AvartarCat = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  margin-bottom: 5px;
`;
const TextArea = styled.textarea`
  border: 1px solid ${props => props.theme.borderColor}s;
  width: 100%;
  height: 70px;
  resize: none;
  border-radius: 7px;
  padding: 10px;
  outline: none;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgCommentWriteColor};
  font-size: 15px;
`;
const P = styled.p`
  position: absolute;
  left: 65px;
  top: 15px;
  @media (max-width: 940px) {
    font-size: 14px;
  }
  a {
    color: #0092fa;
    text-decoration: underline;
    font-weight: bold;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    color: red;
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
`;
const Button = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: #0580d7;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`;
const Box2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvartarEditor = styled.div`
  display: flex;
  margin-bottom: 50px;
  img {
    margin-right: 10px;
  }
`;
const Editor = styled(ReactEditor)``;

// =============================================================================

interface ICommentInfo extends ISection {
  avartarURL?: string;
  parentCommentID?: number;
  setCommentWrite?: Dispatch<SetStateAction<boolean>>;
}

// =============================================================================

export default function PostCommentWrite({
  parentCommentID,
  setCommentWrite,
  section,
}: ICommentInfo) {
  const loginUser = useLoginUser();
  const [text, setText] = useState(''); // 댓글 Text
  const { id } = useParams();

  const queryClient = useQueryClient();

  const data = {
    commentText: text,
    date: DateToday(),
    postID: Number(id),
    page: section,
    parentID: parentCommentID,
  };

  const onSuccess = () => {
    setText('');
    setCommentWrite && setCommentWrite(false);
    queryClient.invalidateQueries(['comments', `PostId: ${id}`]);
    queryClient.invalidateQueries(['childrenComments', parentCommentID]);
  };

  // 댓글쓰기 클릭 시
  const { mutate: createMutate } = useMutation(createComment(data), {
    onSuccess,
  });

  return (
    <Container>
      {loginUser ? (
        <>
          <Box2 className="commentWrite">
            <AvartarEditor>
              <Avartar width="50px" heigth="50px" src={loginUser?.avartar} />
              <Editor
                value={text}
                onChange={(text: string) =>
                  setText(text.replace('nesw-resize', 'default'))
                }
              />
            </AvartarEditor>
            <ButtonBox>
              <Button
                onClick={() => {
                  if (!text) {
                    return alert('1자 이상 입력해주세요.');
                  }
                  createMutate();
                }}
              >
                댓글쓰기
              </Button>
            </ButtonBox>
          </Box2>
        </>
      ) : (
        <>
          <Box>
            <AvartarCat
              src="https://okky.kr/icons/icon-profile.svg"
              alt="고양이사진"
            />
            <TextArea readOnly />
            <P>
              댓글을 쓰려면 <Link to="/login">로그인</Link>이 필요합니다.
            </P>
          </Box>
          <ButtonBox>
            <Button disabled>댓글쓰기</Button>
          </ButtonBox>
        </>
      )}
    </Container>
  );
}
