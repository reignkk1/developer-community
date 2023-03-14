import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import Avartar from "../Avartar";

// =============================================================================

const Container = styled.div`
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
const AvartarCat = styled.img`
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
  margin-bottom: 10px;
`;

// =============================================================================

interface ICommentInfo {
  loginState: Boolean;
  postID: string | undefined;
  page: string;
}

// =============================================================================

export default function CommentWrite({
  loginState,
  postID,
  page,
}: ICommentInfo) {
  const [text, setText] = useState("");

  const onClick = () => {
    axios
      .post(
        "/comment",
        {
          commentText: text,
          date: new Date().toLocaleDateString("ko-kr"),
          postID: Number(postID),
          page: page,
        },
        { withCredentials: true }
      )
      .then(() => {
        setText("");
        return alert("댓글 생성완료!");
      });
  };

  return (
    <Container>
      {loginState ? (
        <>
          <WriteBox2 className="commentWrite">
            <Avartar width="50px" heigth="50px" />
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
