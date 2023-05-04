import { Link } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, Dispatch, SetStateAction } from "react";

// File
import Avartar from "../../common/Avartar";
import { useRecoilValue } from "recoil";
import { avartarUrl } from "../../../atom";
import { Write } from "./styles";

// =============================================================================

interface ICommentInfo {
  loginState: Boolean;
  postID: string | undefined;
  page: string;
  avartarURL?: string;
  parentCommentID?: number;
  setCommentWrite?: Dispatch<SetStateAction<boolean>>;
}

// =============================================================================

export default function CommentWrite({
  loginState,
  postID,
  page,
  parentCommentID,
  setCommentWrite,
}: ICommentInfo) {
  const [text, setText] = useState(""); // 댓글 Text
  const avartarURL = useRecoilValue(avartarUrl);

  // 댓글쓰기 클릭 시
  const onClick = async () => {
    await axios.post("/comment", {
      commentText: text,
      date: new Date().toLocaleDateString("ko-kr"),
      postID: Number(postID),
      page: page,
      parentID: parentCommentID,
    });
    setText("");
    setCommentWrite && setCommentWrite(false);
    return alert("댓글 생성완료!");
  };

  return (
    <Write.Container>
      {loginState ? (
        <>
          <Write.Box2 className="commentWrite">
            <Avartar width="50px" heigth="50px" src={avartarURL} />
            <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
          </Write.Box2>

          <Write.ButtonBox>
            <Write.Button onClick={onClick}>댓글쓰기</Write.Button>
          </Write.ButtonBox>
        </>
      ) : (
        <>
          <Write.Box>
            <Write.AvartarCat
              src="https://okky.kr/icons/icon-profile.svg"
              alt="고양이사진"
            />
            <Write.TextArea readOnly />
            <Write.P>
              댓글을 쓰려면 <Link to="/login">로그인</Link>이 필요합니다.
            </Write.P>
          </Write.Box>
          <Write.ButtonBox>
            <Write.Button disabled>댓글쓰기</Write.Button>
          </Write.ButtonBox>
        </>
      )}
    </Write.Container>
  );
}
