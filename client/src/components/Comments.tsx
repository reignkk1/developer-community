import styled from "@emotion/styled";
import { useQuery } from "react-query";
import axios from "axios";

const Container = styled.div`
  margin-top: 100px;
`;
const CommentsBox = styled.ul``;
const CommentsItem = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 80px;

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

interface ICommentsProps {
  page: string;
  postID: string | undefined;
}

interface IData {
  id: number;
  date: string;
  text: string;
  postID: number;
  writerID: number;
  page: string;
  nickname: string;
}

export default function Comments({ page, postID }: ICommentsProps) {
  const { isLoading, data, error } = useQuery<IData[]>(`${page}Comments`, () =>
    axios
      .get(`http://localhost:8000/${page}/${postID}/comments`)
      .then((response) => response.data)
  );
  console.log(data);
  return (
    <Container>
      <CommentsBox>
        {data?.map((data) => (
          <CommentsItem key={data.id}>
            <User>
              <Avartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
              <UserInfo>
                <Nickname>{data.nickname}</Nickname>
                <Date>{data.date}</Date>
              </UserInfo>
            </User>
            <Text>{data.text}</Text>
          </CommentsItem>
        ))}
      </CommentsBox>
    </Container>
  );
}
