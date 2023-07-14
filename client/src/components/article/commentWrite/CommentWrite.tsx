import { Link, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, Dispatch, SetStateAction } from "react";

// File
import Avartar from "../../common/Avartar";
import { Write } from "./styles";
import { useGetAxios, usePostAxios } from "../../../hooks/api/http";
import { IUserData } from "../../../types";
import { useRecoilValue } from "recoil";
import { category } from "../../../atom";
import { useQueryClient } from "react-query";

// =============================================================================

interface ICommentInfo {
  avartarURL?: string;
  parentCommentID?: number;
  setCommentWrite?: Dispatch<SetStateAction<boolean>>;
}

// =============================================================================

export default function CommentWrite({
  parentCommentID,
  setCommentWrite,
}: ICommentInfo) {
  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");
  const [text, setText] = useState(""); // 댓글 Text
  const { id } = useParams();
  const page = useRecoilValue(category);
  const queryClient = useQueryClient();

  const data = {
    commentText: text,
    date: new Date().toLocaleDateString("ko-kr"),
    postID: Number(id),
    page,
    parentID: parentCommentID,
  };

  const onSuccess = () => {
    setText("");
    setCommentWrite && setCommentWrite(false);
    queryClient.invalidateQueries(["GET", `/article/${page}/${id}/comments`]);
  };

  // 댓글쓰기 클릭 시
  const { mutate: createComment } = usePostAxios("/comment", data, onSuccess);
  const onClick = () => createComment();

  return (
    <Write.Container>
      {loginUser ? (
        <>
          <Write.Box2 className="commentWrite">
            <Avartar width="50px" heigth="50px" src={loginUser?.avartar} />
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
