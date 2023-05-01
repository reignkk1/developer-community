import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

// File
import { Link } from "react-router-dom";
import { ErrorBox, LoadingBox } from "../../common/LoadingError";
import { commentsGet } from "../../../axios";
import Parser from "html-react-parser";
import Avartar from "../../common/Avartar";
import {
  BtnBox,
  CancleBtn,
  CommentWriteBtn,
  CommentsBox,
  CommentsItem,
  Container,
  Count,
  Date,
  DeleteBtn,
  Input,
  ModifyBtn,
  Nickname,
  Text,
  User,
  UserInfo,
} from "./styles";
import CommentWrite from "../commentWrite/CommentWrite";

// =============================================================================

interface ICommentsProps {
  page: string;
  postID: string | undefined;
  loginState: boolean;
}
// =============================================================================

interface IData {
  result: [
    {
      id: number;
      date: string;
      text: string;
      postID: number;
      writerID: number;
      page: string;
      nickname: string;
      avartar: string;
    }
  ];
  userID: number;
}

export default function Comments({ page, postID, loginState }: ICommentsProps) {
  const [modify, setModify] = useState(false); // 수정모드 True or False
  const [id, setID] = useState<number>(); // 수정버튼 클릭 시 해당 댓글의 ID값
  const [value, setValue] = useState(""); // 수정모드 시 input의 Value값
  const [commentWrite, setCommentWrite] = useState(false);

  // 해당 게시물의 댓글들 Fetch
  const { isLoading, data, error, refetch } = useQuery<IData>(
    [`${page}Comments`, postID],
    () => commentsGet(page, postID)
  );

  // input value 값 변할때마다 value state 변경
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  // 현재 로그인 하고있는 유저ID
  const userID = data?.userID;

  // 삭제버튼 클릭 시
  const onDelete = (id: number) => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      axios.delete(`/comment/${id}`).then(() => alert("삭제완료!"));
    }
    return;
  };

  // 수정버튼 클릭 시
  const onModify = (id: number) => {
    setID(id); //댓글 ID값
    return setModify(true); //수정모드 ON
  };

  // 수정완료 버튼 클릭 시
  const onModifyComplete = async (id: number) => {
    await axios.patch(`/comment/${id}`, {
      commentText: value,
    });
    setModify(false);
    return refetch();
  };
  // 수정 취소
  const onCancle = () => setModify(false);

  const onCommentWrite = (id: number) => {
    setID(id);
    setCommentWrite(false);
  };
  const onCommentWriteCancle = (id: number) => {
    setID(id);
    setCommentWrite(true);
  };
  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <Container>
          <Count>{data ? data?.result.length : 0}개의 댓글</Count>
          {data ? (
            <CommentsBox>
              {data?.result.map((data) => (
                <CommentsItem key={data.id}>
                  <User>
                    <Link to={`/user/${data.writerID}/posts`}>
                      <Avartar width="40px" heigth="40px" src={data.avartar} />
                    </Link>
                    <UserInfo>
                      <Link to={`/user/${data.writerID}/posts`}>
                        <Nickname>{data.nickname}</Nickname>
                      </Link>
                      <Date>{data.date}</Date>
                    </UserInfo>
                  </User>
                  {modify && id === data.id ? (
                    <Input
                      onChange={onChange}
                      defaultValue={data.text.replace(/<\/?[^>]+(>|$)/g, "")}
                    />
                  ) : (
                    <Text>{Parser(data.text)}</Text>
                  )}
                  {loginState && userID === data.writerID ? (
                    <BtnBox id={`${data.id}`}>
                      {modify && id === data.id ? (
                        <>
                          <CancleBtn onClick={onCancle}>취소</CancleBtn>
                          <ModifyBtn
                            onClick={() => onModifyComplete(data.id)}
                            disabled={
                              value === data.text || value === "" ? true : false
                            }
                          >
                            수정완료
                          </ModifyBtn>
                        </>
                      ) : (
                        <>
                          <DeleteBtn onClick={() => onDelete(data.id)}>
                            삭제
                          </DeleteBtn>
                          <ModifyBtn onClick={() => onModify(data.id)}>
                            수정
                          </ModifyBtn>
                        </>
                      )}
                    </BtnBox>
                  ) : null}

                  {commentWrite && id === data.id ? (
                    <CommentWriteBtn onClick={() => onCommentWrite(data.id)}>
                      댓글 취소
                    </CommentWriteBtn>
                  ) : (
                    <CommentWriteBtn
                      onClick={() => onCommentWriteCancle(data.id)}
                    >
                      댓글 쓰기
                    </CommentWriteBtn>
                  )}

                  {commentWrite && id === data.id ? (
                    <CommentWrite
                      loginState={loginState}
                      postID={postID}
                      page={page}
                    />
                  ) : null}
                </CommentsItem>
              ))}
            </CommentsBox>
          ) : null}
        </Container>
      )}
    </>
  );
}
