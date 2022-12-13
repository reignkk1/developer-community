import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import styled from "@emotion/styled";

interface viewPost {
  id: number;
  title: string;
  content: string;
}

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
`;

const ListTitle = styled.h1`
  font-size: 50px;
`;

const List = styled.ul``;
const ListItem = styled.li``;
const ItemTitle = styled.div``;
const ItemContent = styled.div``;

export default function View() {
  const [viewPost, setViewPost] = useState<viewPost[]>([]);
  const [editorData, setEditorData] = useState({
    title: "",
    content: "",
  });

  const getData = () =>
    axios
      .get("http://localhost:8000/api/get")
      .then((response) => setViewPost(response.data));

  useEffect(() => {
    getData();
  }, []);

  const postSubmit = () => {
    if (editorData.title === "") return alert("제목을 입력해주세요!");
    if (editorData.content === "") return alert("내용을 입력해주세요!");

    axios
      .post("http://localhost:8000/api/insert", {
        title: editorData.title,
        content: editorData.content,
      })
      .then(() => getData().then(() => alert("등록 완료!")));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditorData({ ...editorData, title });
  };

  return (
    <Container>
      <ListTitle>게시글 목록</ListTitle>
      <List>
        {viewPost.map((item) => (
          <ListItem>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemContent>{ReactHtmlParser(item.content)}</ItemContent>
          </ListItem>
        ))}
      </List>

      <input
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

      <button onClick={postSubmit}>작성하기</button>
    </Container>
  );
}
