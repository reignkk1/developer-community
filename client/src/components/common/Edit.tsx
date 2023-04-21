import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

// File
import { IArticleCommentData, IPage } from "../../type";
import Button from "./button";
import { useQuery } from "react-query";

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
  padding: 5px 15px;
  outline: none;
  background-color: ${(props) => props.theme.inputColor};
  border: 2px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
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

  const { isLoading, error } = useQuery<IArticleCommentData>(
    `[edit,${id}]`,
    () =>
      axios.get(`/article/${page}/${id}`).then((response) => {
        setInputData(response.data.result[0].title || "");
        setEditorData(response.data.result[0].content || "");
        return response.data.result[0];
      })
  );

  const postSubmit = () => {
    if (inputData === "") return alert("제목을 입력해주세요!");
    if (editorData === "") return alert("내용을 입력해주세요!");

    axios
      .patch(`/article/${page}/${id}`, {
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
    <Container className="editWrite">
      <Title>제목</Title>
      <Input
        type="text"
        placeholder="제목을 입력해주세요!"
        onChange={onChangeInput}
        required
        value={isLoading ? "로딩중.." : error ? "404 Not Found" : inputData}
      />
      <Title>본문</Title>
      <CKEditor
        editor={ClassicEditer}
        onChange={(event, editor) => {
          const editorData = editor.getData();

          setEditorData(editorData);
        }}
        data={isLoading ? "로딩중.." : error ? "404 Not Found" : editorData}
      />

      <Button onClick={postSubmit}>수정하기</Button>
    </Container>
  );
}
