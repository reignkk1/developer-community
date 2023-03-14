import styled from "@emotion/styled";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

// File
import { Link } from "react-router-dom";
import { ErrorBox, LoadingBox } from "../LoadingError";
import { commentsGet } from "../../axios";
import Parser from "html-react-parser";
import Avartar from "../Avartar";

// =============================================================================

const Container = styled.div`
  margin-top: 20px;
`;
const CommentsBox = styled.ul``;
const CommentsItem = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 40px;
  margin-bottom: 40px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
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
const Text = styled.div``;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 7px 10px;
  border-radius: 5px;
  font-size: 13px;
  &:hover {
    background-color: #0580d7;
  }
`;
const DeleteBtn = styled(Btn)`
  margin-right: 5px;
`;
const ModifyBtn = styled(Btn)``;

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

const Count = styled.div`
  margin-bottom: 50px;
`;

// =============================================================================

interface ICommentsProps {
  page: string;
  postID: string | undefined;
  loginState: boolean;
}
// =============================================================================

interface IData {
  info: [
    {
      id: number;
      date: string;
      text: string;
      postID: number;
      writerID: number;
      page: string;
      nickname: string;
    }
  ];
  userID: number;
}

export default function Comments({ page, postID, loginState }: ICommentsProps) {
  const [modify, setModify] = useState(false);
  const [id, setID] = useState("");
  const [value, setValue] = useState("");
  const [undifined, setUndifined] = useState(false);

  const { isLoading, data, error } = useQuery<IData>(
    [`${page}Comments`, postID],
    () => commentsGet(page, postID, setUndifined, setValue)
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const userID = data?.userID;

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.parentElement?.id);
    if (window.confirm("정말로 삭제하겠습니까?")) {
      axios.delete(`/comment/${id}`).then(() => alert("삭제완료!"));
    }
    return;
  };
  const onModify = (e: React.MouseEvent<HTMLButtonElement>) => {
    setID(e.currentTarget.parentElement?.id || "");
    setModify(true);
  };
  const onModifyComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.parentElement?.id;
    axios
      .patch(`/comment/${id}`, {
        commentText: value,
      })
      .then(() => {
        setModify(false);
        return alert("수정완료!");
      });
  };
  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox />
      ) : (
        <Container>
          <Count>{undifined ? 0 : data?.info.length}개의 댓글</Count>
          <CommentsBox>
            {data?.info.map((data) => (
              <CommentsItem key={data.id}>
                <User>
                  <Link to={`/user/${data.writerID}/posts`}>
                    <Avartar width="50px" heigth="50px" />
                  </Link>
                  <UserInfo>
                    <Link to={`/user/${data.writerID}/posts`}>
                      <Nickname>{data.nickname}</Nickname>
                    </Link>
                    <Date>{data.date}</Date>
                  </UserInfo>
                </User>
                {modify && Number(id) === data.id ? (
                  <Input
                    onChange={onChange}
                    value={value.replace(/<\/?[^>]+(>|$)/g, "")}
                  />
                ) : (
                  <Text>{Parser(data.text)}</Text>
                )}
                {loginState && userID === data.writerID ? (
                  <BtnBox id={`${data.id}`}>
                    <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
                    {modify && Number(id) === data.id ? (
                      <ModifyBtn onClick={onModifyComplete}>수정완료</ModifyBtn>
                    ) : (
                      <ModifyBtn onClick={onModify}>수정</ModifyBtn>
                    )}
                  </BtnBox>
                ) : null}
              </CommentsItem>
            ))}
          </CommentsBox>
        </Container>
      )}
    </>
  );
}
