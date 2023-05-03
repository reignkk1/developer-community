import { useQuery } from "react-query";
import { Comment } from "./styles";
import { Link } from "react-router-dom";
import Avartar from "../../common/Avartar";
import Parser from "html-react-parser";
import useComment from "./useComment";
import { replyCommentsGet } from "../../../axios";
import styled from "@emotion/styled";

const Container = styled(Comment.Container)`
  margin-left: 50px;

  li {
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    border-bottom: none;
    padding-left: 15px;
  }
`;

interface IComment {
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
      parentID: number;
    }
  ];
  loginUserID: number;
}

interface IReplyComment {
  parentID: number;
  loginState: boolean;
}

export default function ReplyComment({ parentID, loginState }: IReplyComment) {
  const { data, error, refetch, isLoading } = useQuery<IComment>(
    [`childrenComment,${parentID}`],
    () => replyCommentsGet(parentID)
  );

  // response data
  const loginUserID = data?.loginUserID;
  const comments = data?.result;

  const {
    clickCommentID,
    modifyInputValue,
    modify,
    onDelete,
    onModify,
    onModifyComplete,
    onCancle,
    onChange,
  } = useComment();

  return comments?.length ? (
    <Container>
      {comments?.map((comment) => (
        <Comment.Item key={comment.id}>
          <Comment.User>
            <Link to={`/user/${comment.writerID}/posts`}>
              <Avartar width="40px" heigth="40px" src={comment.avartar} />
            </Link>
            <Comment.UserInfo>
              <Link to={`/user/${comment.writerID}/posts`}>
                <Comment.Nickname>{comment.nickname}</Comment.Nickname>
              </Link>
              <Comment.Date>{comment.date}</Comment.Date>
            </Comment.UserInfo>
          </Comment.User>
          {modify && clickCommentID === comment.id ? (
            <Comment.Input
              onChange={onChange}
              defaultValue={comment.text.replace(/<\/?[^>]+(>|$)/g, "")}
            />
          ) : (
            <Comment.Text>{Parser(comment.text)}</Comment.Text>
          )}
          {loginState && loginUserID === comment.writerID ? (
            <Comment.BtnBox id={`${comment.id}`}>
              {modify && clickCommentID === comment.id ? (
                <>
                  <Comment.CancleBtn onClick={onCancle}>취소</Comment.CancleBtn>
                  <Comment.ModifyBtn
                    onClick={() => onModifyComplete(comment.id, refetch)}
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
                  <Comment.DeleteBtn onClick={() => onDelete(comment.id)}>
                    삭제
                  </Comment.DeleteBtn>
                  <Comment.ModifyBtn onClick={() => onModify(comment.id)}>
                    수정
                  </Comment.ModifyBtn>
                </>
              )}
            </Comment.BtnBox>
          ) : null}
        </Comment.Item>
      ))}
    </Container>
  ) : null;
}
