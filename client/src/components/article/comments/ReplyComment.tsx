import { Comment } from "./styles";
import { Link } from "react-router-dom";
import Avartar from "../../common/Avartar";
import Parser from "html-react-parser";
import useComment from "./hook/useComment";
import styled from "@emotion/styled";
import { IComment } from "../../../types";
import { useGetAxios } from "../../../hooks/api/http";

const Container = styled(Comment.Container)`
  margin-left: 50px;

  li {
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    border-bottom: none;
    padding-left: 15px;
  }
`;

interface IData {
  result: [IComment];
  loginUserID: number;
}

interface IReplyComment {
  parentID: number;
}

export default function ReplyComment({ parentID }: IReplyComment) {
  const { data } = useGetAxios<IData>(`/comment/children/${parentID}`);
  const { data: loginUser } = useGetAxios("/user/login-info");

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
          {loginUser && loginUserID === comment.writerID ? (
            <Comment.BtnBox id={`${comment.id}`}>
              {modify && clickCommentID === comment.id ? (
                <>
                  <Comment.CancleBtn onClick={onCancle}>취소</Comment.CancleBtn>
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
