import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import styled from "@emotion/styled";
import { Navigate, useNavigate } from "react-router-dom";

// File
import { IPage, IUserData } from "../../types";
import Button from "./button";
import { useGetAxios, usePostAxios } from "../../hooks/api/http";

// =============================================================================

const Container = styled.div`
  width: 60%;
  height: 120vh;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  @media (max-width: 850px) {
    width: 80%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  padding: 10px 15px;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.inputColor};
  color: ${(props) => props.theme.textColor};
  &:focus {
    border: 2px solid #0092fa;
  }
  border-radius: 5px;
`;

const Title = styled.div`
  text-align: start;
  font-size: 15px;
  margin-bottom: 5px;
`;

// =============================================================================

interface IData {
  title: string;
  content: string;
  date: string;
}

export default function Write({ page }: IPage) {
  const navigate = useNavigate();

  const [editorData, setEditorData] = useState({
    title: "",
    content: "",
  });
  const data = {
    title: editorData.title,
    content: editorData.content,
    date: new Date().toLocaleDateString("ko-kr"),
  };
  const onSuccess = () => navigate(`/${page}`);

  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");

  const { mutate: createPost } = usePostAxios<IData>(
    `/article/${page}`,
    data,
    onSuccess
  );

  const postSubmit = () => {
    if (editorData.title === "") return alert("제목을 입력해주세요!");
    if (editorData.content === "") return alert("내용을 입력해주세요!");
    createPost();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditorData({ ...editorData, title });
  };

  return loginUser ? (
    <Container className="articleWrite">
      <Title>제목</Title>
      <Input
        placeholder="제목을 입력해주세요!"
        onChange={onChangeInput}
        required
      />
      <Title>본문</Title>
      <CKEditor
        editor={ClassicEditer}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData({ ...editorData, content: data });
        }}
      />

      <Button onClick={postSubmit}>작성하기</Button>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
