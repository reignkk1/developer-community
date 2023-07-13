import { useState } from "react";

// File
import { Link, useParams } from "react-router-dom";
import { ErrorBox, LoadingBox } from "../../common/LoadingError";
import Parser from "html-react-parser";
import Avartar from "../../common/Avartar";
import { Comment } from "./styles";
import CommentWrite from "../commentWrite/CommentWrite";
import ReplyComment from "./ReplyComment";
import useComment from "./hook/useComment";
import { IComment } from "../../../types";
import { category } from "../../../atom";
import { useRecoilValue } from "recoil";
import { useGetAxios } from "../../../hooks/api/Article";

// =============================================================================

interface IData {
  result: [IComment];
  loginUserID: number;
}

export default function Comments() {
  const [commentWrite, setCommentWrite] = useState(false);
  const { data: loginUser } = useGetAxios("/user/login-info");
  const { id } = useParams();
  const page = useRecoilValue(category);

  // 해당 게시물의 댓글들 Fetch
  const { data, isLoading, error } = useGetAxios<IData>(
    `/article/${page}/${id}/comments`
  );
  // response data
  const loginUserID = data?.loginUserID;
  const comments = data?.result;

  const {
    setClickCommentID,
    clickCommentID,
    modifyInputValue,
    modify,
    onDelete,
    onModify,
    onModifyComplete,
    onCancle,
    onChange,
  } = useComment();

  const onCommentWrite = (id: number) => {
    setClickCommentID(id);
    setCommentWrite(false);
  };
  const onCommentWriteCancle = (id: number) => {
    setClickCommentID(id);
    setCommentWrite(true);
  };
  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <Comment.Container>
          <Comment.Count>
            {comments ? comments?.length : 0}개의 댓글
          </Comment.Count>
          {data ? (
            <Comment.Box>
              {comments?.map((comment) =>
                !comment.parentID ? (
                  <Comment.Item key={comment.id}>
                    <Comment.User>
                      <Link to={`/user/${comment.writerID}/posts`}>
                        <Avartar
                          width="40px"
                          heigth="40px"
                          src={comment.avartar}
                        />
                      </Link>
                      <Comment.UserInfo>
                        <Link to={`/user/${comment.writerID}/posts`}>
                          <Comment.Nickname>
                            {comment.nickname}
                          </Comment.Nickname>
                        </Link>
                        <Comment.Date>{comment.date}</Comment.Date>
                      </Comment.UserInfo>
                    </Comment.User>
                    {modify && clickCommentID === comment.id ? (
                      <Comment.Input
                        onChange={onChange}
                        defaultValue={comment.text.replace(
                          /<\/?[^>]+(>|$)/g,
                          ""
                        )}
                      />
                    ) : (
                      <Comment.Text>{Parser(comment.text)}</Comment.Text>
                    )}
                    {loginUser && loginUserID === comment.writerID ? (
                      <Comment.BtnBox id={`${comment.id}`}>
                        {modify && clickCommentID === comment.id ? (
                          <>
                            <Comment.CancleBtn onClick={onCancle}>
                              취소
                            </Comment.CancleBtn>
                            <Comment.ModifyBtn
                              onClick={() => onModifyComplete(comment.id)}
                              disabled={
                                modifyInputValue === comment.text ||
                                modifyInputValue === ""
                                  ? true
                                  : false
                              }
                            >
                              수정완료
                            </Comment.ModifyBtn>
                          </>
                        ) : (
                          <>
                            <Comment.DeleteBtn
                              onClick={() => onDelete(comment.id)}
                            >
                              삭제
                            </Comment.DeleteBtn>
                            <Comment.ModifyBtn
                              onClick={() => onModify(comment.id)}
                            >
                              수정
                            </Comment.ModifyBtn>
                          </>
                        )}
                      </Comment.BtnBox>
                    ) : null}

                    {commentWrite && clickCommentID === comment.id ? (
                      <Comment.WriteBtn
                        onClick={() => onCommentWrite(comment.id)}
                      >
                        댓글 취소
                      </Comment.WriteBtn>
                    ) : (
                      <Comment.WriteBtn
                        onClick={() => onCommentWriteCancle(comment.id)}
                      >
                        댓글 쓰기
                      </Comment.WriteBtn>
                    )}

                    {commentWrite && clickCommentID === comment.id ? (
                      <CommentWrite
                        parentCommentID={comment.id}
                        setCommentWrite={setCommentWrite}
                      />
                    ) : null}
                    <ReplyComment parentID={comment.id} />
                  </Comment.Item>
                ) : null
              )}
            </Comment.Box>
          ) : null}
        </Comment.Container>
      )}
    </>
  );
}
