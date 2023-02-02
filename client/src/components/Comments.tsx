import styled from "@emotion/styled";
import { useQuery } from "react-query";
import axios from "axios";

const Container = styled.div`
  margin-top: 100px;
`;
const CommentsBox = styled.ul``;
const CommentsItem = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 20px;
  margin-bottom: 40px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Avartar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 10px;
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

interface ICommentsProps {
  page: string;
  postID: string | undefined;
}

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
      userID: number;
    }
  ];
  userID: number;
}

export default function Comments({ page, postID }: ICommentsProps) {
  const { isLoading, data, error } = useQuery<IData>(`${page}Comments`, () =>
    axios
      .get(`http://localhost:8000/${page}/${postID}/comments`, {
        withCredentials: true,
      })
      .then((response) => response.data)
  );
  console.log(data);

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.parentElement?.id);
    if (window.confirm("정말로 삭제하겠습니까?")) {
      axios
        .delete(`http://localhost:8000/comment/${id}`)
        .then((response) => alert("삭제완료!"));
    }

    return;
  };
  const onModify = () => {};
  return (
    <Container>
      <CommentsBox>
        {data?.info.map((data) => (
          <CommentsItem key={data.id}>
            <User>
              <Avartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
              <UserInfo>
                <Nickname>{data.nickname}</Nickname>
                <Date>{data.date}</Date>
              </UserInfo>
            </User>
            <Text>{data.text}</Text>
            <BtnBox id={`${data.id}`}>
              <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
              <ModifyBtn onClick={onModify}>수정</ModifyBtn>
            </BtnBox>
          </CommentsItem>
        ))}
      </CommentsBox>
    </Container>
  );
}
