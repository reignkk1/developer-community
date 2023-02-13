import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

// File
import { IPage } from "../interface";
import Button from "./button";

// =============================================================================

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

const Title = styled.div`
  text-align: start;
  font-size: 15px;
  margin-bottom: 5px;
`;

// =============================================================================

export default function Edit({ page }: IPage) {
  const [inputData, setInputData] = useState("");
  const [editorData, setEditorData] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAPI = async () => {
      const response = await axios.get(`http://localhost:8000/${page}/${id}`);

      setInputData(response.data.user[0].title);
      setEditorData(response.data.user[0].content);
    };
    getAPI();
  }, []);

  const postSubmit = () => {
    if (inputData === "") return alert("제목을 입력해주세요!");
    if (editorData === "") return alert("내용을 입력해주세요!");

    axios
      .patch(`http://localhost:8000/${page}/${id}`, {
        title: inputData,
        content: editorData,
      })
      .then(() => navigate(`/${page}`))
      .then(() => alert("수정 완료!"));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setInputData(title);
  };

  return (
    <Container>
      <Title>제목</Title>
      <Input
        type="text"
        placeholder="제목을 입력해주세요!"
        onChange={onChangeInput}
        required
        value={inputData}
      />
      <Title>본문</Title>
      <CKEditor
        editor={ClassicEditer}
        onChange={(event, editor) => {
          const editorData = editor.getData();

          setEditorData(editorData);
        }}
        data={editorData}
      />

      <Button onClick={postSubmit} text="수정하기" />
    </Container>
  );
}
