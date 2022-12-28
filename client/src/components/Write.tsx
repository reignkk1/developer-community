import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { IPage } from "../interface";

const Container = styled.div`
  width: 60%;
  height: 500px;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  padding: 5px 15px;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  &:focus {
    border: 2px solid #0092fa;
  }
  border-radius: 5px;
`;

const Btn = styled.button``;

const Title = styled.div`
  text-align: start;
  font-size: 15px;
  margin-bottom: 5px;
`;

export default function Write({ page }: IPage) {
  const [editorData, setEditorData] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const postSubmit = () => {
    if (editorData.title === "") return alert("제목을 입력해주세요!");
    if (editorData.content === "") return alert("내용을 입력해주세요!");

    axios
      .post(`http://localhost:8000/${page}`, {
        title: editorData.title,
        content: editorData.content,
        date: new Date().toLocaleDateString("ko-kr"),
        writerID: 123,
      })
      .then(() => alert("등록 완료!"))
      .then(() => navigate("/"));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditorData({ ...editorData, title });
  };

  return (
    <Container>
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

      <Btn onClick={postSubmit}>작성하기</Btn>
    </Container>
  );
}
