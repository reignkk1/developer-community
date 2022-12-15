import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import styled from "@emotion/styled";

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
  border: 2px solid rgba(0, 0, 0, 0.5);
  &:focus {
    border: 2px solid #0092fa;
  }
`;

const Btn = styled.button``;

export default function View() {
  const [editorData, setEditorData] = useState({
    title: "",
    content: "",
  });

  const postSubmit = () => {
    if (editorData.title === "") return alert("제목을 입력해주세요!");
    if (editorData.content === "") return alert("내용을 입력해주세요!");

    axios
      .post("http://localhost:8000/api/notice/insert", {
        title: editorData.title,
        content: editorData.content,
        date: new Date().toLocaleDateString("ko-kr"),
        writerID: 123,
      })
      .then(() => alert("등록 완료!"));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditorData({ ...editorData, title });
  };

  return (
    <Container>
      <Input
        placeholder="제목을 입력해주세요!"
        onChange={onChangeInput}
        required
      />
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
