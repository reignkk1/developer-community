import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

// File
import Avartar from "../../common/Avartar";
import { useRecoilValue } from "recoil";
import { avartarUrl } from "../../../atom";
import {
  AvartarCat,
  Btn,
  Container,
  P,
  TextArea,
  WriteBox,
  WriteBox2,
  WriteBtn,
} from "./styles";

// =============================================================================

// =============================================================================

interface ICommentInfo {
  loginState: Boolean;
  postID: string | undefined;
  page: string;
  avartarURL?: string;
}

// =============================================================================

export default function CommentWrite({
  loginState,
  postID,
  page,
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
    });
    setText("");
    return alert("댓글 생성완료!");
  };

  return (
    <Container>
      {loginState ? (
        <>
          <WriteBox2 className="commentWrite">
            <Avartar width="50px" heigth="50px" src={avartarURL} />
            <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
          </WriteBox2>

          <WriteBtn>
            <Btn onClick={onClick}>댓글쓰기</Btn>
          </WriteBtn>
        </>
      ) : (
        <>
          <WriteBox>
            <AvartarCat
              src="https://okky.kr/icons/icon-profile.svg"
              alt="고양이사진"
            />
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
