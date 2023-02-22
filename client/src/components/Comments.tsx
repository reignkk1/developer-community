import styled from "@emotion/styled";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useState } from "react";

// File
import { logined } from "./../atom";
import { Link } from "react-router-dom";
import { ErrorBox, LoadingBox } from "./LoadingError";

// =============================================================================

const Container = styled.div`
  margin-top: 100px;
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
const Avartar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
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

// =============================================================================

interface ICommentsProps {
  page: string;
  postID: string | undefined;
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

export default function Comments({ page, postID }: ICommentsProps) {
  const { isLoading, data, error } = useQuery<IData>(
    [`${page}Comments`, postID],
    () =>
      axios
        .get(`http://localhost:8000/${page}/${postID}/comments`, {
          withCredentials: true,
        })
        .then((response) => {
          setValue(response.data.info[0].text);
          return response.data;
        })
  );

  const [modify, setModify] = useState(false);
  const [id, setID] = useState("");
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const loginState = useRecoilValue(logined);
  const userID = data?.userID;

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.parentElement?.id);
    if (window.confirm("정말로 삭제하겠습니까?")) {
      axios
        .delete(`http://localhost:8000/comment/${id}`)
        .then((response) => alert("삭제완료!"));
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
      .patch("http://localhost:8000/comment", {
        commentText: value,
        commentID: id,
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
          <CommentsBox>
            {data?.info.map((data, index) => (
              <CommentsItem key={data.id}>
                <User>
                  <Link to={`/user/${data.writerID}/posts`}>
                    <Avartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
                  </Link>
                  <UserInfo>
                    <Link to={`/user/${data.writerID}/posts`}>
                      <Nickname>{data.nickname}</Nickname>
                    </Link>
                    <Date>{data.date}</Date>
                  </UserInfo>
                </User>
                {modify && Number(id) === data.id ? (
                  <Input onChange={onChange} value={value} />
                ) : (
                  <Text>{data.text}</Text>
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
