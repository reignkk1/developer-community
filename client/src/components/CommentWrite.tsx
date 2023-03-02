import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FieldErrors } from "react-hook-form/dist/types";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// =============================================================================

const Container = styled.div`
  height: 180px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  padding: 30px;
  margin-top: 100px;
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50%;
  position: relative;
  margin-bottom: 30px;
`;
const Avartar = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  margin-bottom: 5px;
`;
const TextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.borderColor}s;
  width: 100%;
  height: 70px;
  resize: none;
  border-radius: 7px;
  padding: 10px;
  outline: none;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgCommentWriteColor};
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
  align-items: center;
  span {
    color: red;
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
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
  margin-top: 5px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 30px;
  outline: none;
  &:focus {
    border: 1px solid #0580d7;
  }
`;
const UserAvartar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
`;

// =============================================================================

interface ICommentInfo {
  loginState: Boolean;
  postID: string | undefined;
  page: string;
}

interface ICommentText {
  commentText: string;
}
// =============================================================================

export default function CommentWrite({
  loginState,
  postID,
  page,
}: ICommentInfo) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICommentText>();

  const onValid = (data: ICommentText) => {
    axios
      .post(
        "/comment",
        {
          commentText: data.commentText,
          date: new Date().toLocaleDateString("ko-kr"),
          postID: Number(postID),
          page: page,
        },
        { withCredentials: true }
      )
      .then(() => {
        setValue("commentText", "");
        return alert("댓글 생성완료!");
      });
  };
  const oninvalid = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <Container>
      {loginState ? (
        <WriteBox2 className="commentWrite">
          <UserAvartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
          <CKEditor editor={ClassicEditor} />
          {/*<Form onSubmit={handleSubmit(onValid, oninvalid)}>
            <Input
              {...register("commentText", {
                required: "1자 이상 입력해주세요!",
              })}
              type="text"
            />

            <WriteBtn>
              <span>{errors.commentText?.message}</span>
              <Btn>댓글쓰기</Btn>
            </WriteBtn>
            </Form>*/}
        </WriteBox2>
      ) : (
        <>
          <WriteBox>
            <Avartar src="https://okky.kr/icons/icon-profile.svg" />
            <TextArea readOnly />
            <P>
              댓글을 쓰려면 <Link to="/login">로그인</Link>이 필요합니다.
            </P>
          </WriteBox>
          <WriteBtn>
            <Btn disabled>댓글쓰기</Btn>
          </WriteBtn>
        </>
      )}
    </Container>
  );
}
