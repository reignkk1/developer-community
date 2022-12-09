import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import Axios from "axios";

interface viewPost {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [viewPost, setViewPost] = useState<viewPost[]>([]);
  const [editorData, setEditorData] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    Axios.get("http://localhost:8000/api/get").then((response) =>
      setViewPost(response.data)
    );
  }, []);
  console.log(viewPost);
  console.log(editorData);

  const postSubmit = () => {};

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditorData({ ...editorData, title });
  };

  return (
    <main>
      <h1>게시글 목록</h1>

      {viewPost.map((item) => (
        <ul key={item.id}>
          <li>{item.title}</li>
          <li>{item.content}</li>
        </ul>
      ))}

      <input placeholder="제목을 입력해주세요!" onChange={onChangeInput} />
      <CKEditor
        data="내용을 적어주세요!"
        editor={ClassicEditer}
        onChange={(event, editor) => {
          const data = editor.getData();

          setEditorData({ ...editorData, content: data });
        }}
      />

      <button onClick={postSubmit}>작성하기</button>
    </main>
  );
}

export default App;
