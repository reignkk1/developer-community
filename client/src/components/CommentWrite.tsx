import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 180px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px;
  margin-top: 100px;
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50%;
  margin-bottom: 30px;
  position: relative;
`;
const Avartar = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  margin-bottom: 5px;
`;
const TextArea = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 70px;
  resize: none;
  border-radius: 7px;
  padding: 10px;
  outline: none;

  font-size: 15px;
`;
const P = styled.p`
  position: absolute;
  left: 65px;
  top: 15px;
  a {
    color: #0092fa;
    text-decoration: underline;
    font-weight: bold;
  }
`;
const WriteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Btn = styled.button`
  background-color: #0092fa;
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 40px;
  border-radius: 5px;
  margin-bottom: 20px;
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
const WriteBox2 = styled.div`
  display: flex;
`;
const Form = styled.form`
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
`;
const UserAvartar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

interface IloginState {
  loginState: Boolean;
}

interface IComment {
  commentText: string;
}

export default function CommentWrite({ loginState }: IloginState) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IComment>();

  const onValid = (data: IComment) => {
    console.log(data);
  };
  const oninvalid = () => {};

  return (
    <Container>
      {/* <WriteBox>
        <Avartar src="https://okky.kr/icons/icon-profile.svg" />
        <TextArea readOnly />
        <P>
          댓글을 쓰려면 <Link to="/login">로그인</Link>이 필요합니다.
        </P>
      </WriteBox> 
       <WriteBtn>
          <Btn disable>댓글쓰기</Btn>
        </WriteBtn> */}
      <WriteBox2>
        <UserAvartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
        <Form onSubmit={handleSubmit(onValid, oninvalid)}>
          <Input
            {...register("commentText", { required: "1자 이상 입력해주세요!" })}
            type=""
          />

          <WriteBtn>
            <Btn>댓글쓰기</Btn>
          </WriteBtn>
        </Form>
      </WriteBox2>
    </Container>
  );
}
