import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  BtnBox,
  CancleBtn,
  CommentWriteBtn,
  CommentsItem,
  Date,
  DeleteBtn,
  Input,
  ModifyBtn,
  Nickname,
  Text,
  User,
  UserInfo,
} from "./styles";
import { Link } from "react-router-dom";
import Avartar from "../../common/Avartar";
import Parser from "html-react-parser";
import ReplyCommentWrite from "../commentWrite/ReplyCommentWrite";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-left: 50px;
`;

interface IData {
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

interface IReplyComment {
  parentID: number;
  loginState: boolean;
  loginUserID?: number;
}

export default function ReplyComment({
  parentID,
  loginState,
  loginUserID,
}: IReplyComment) {
  const [value, setValue] = useState("");
  const [modify, setModify] = useState(false); // 수정모드 True or False
  const [id, setID] = useState<number>(); // 수정버튼 클릭 시 해당 댓글의 ID값

  const { data, error, refetch, isLoading } = useQuery<IData[]>(
    [`childrenComment,${parentID}`],
    () =>
      axios.get(`/comment/children/${parentID}`).then((response) => {
        console.log(data);
        return response.data;
      })
  );

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
  };
  // 수정 취소
  const onCancle = () => setModify(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  console.log(data);

  return data?.length ? (
    <Container>
      {data?.map((data) => (
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
          {loginState && loginUserID === data.writerID ? (
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
                  <DeleteBtn onClick={() => onDelete(data.id)}>삭제</DeleteBtn>
                  <ModifyBtn onClick={() => onModify(data.id)}>수정</ModifyBtn>
                </>
              )}
            </BtnBox>
          ) : null}
        </CommentsItem>
      ))}
    </Container>
  ) : null;
}
