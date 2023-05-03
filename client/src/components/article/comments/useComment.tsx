import axios from "axios";
import { useState } from "react";

export default function useComment() {
  const [modify, setModify] = useState(false);
  const [clickCommentID, setClickCommentID] = useState<number>();
  const [modifyInputValue, setModifyInputValue] = useState("");

  const onDelete = (id: number) => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      axios.delete(`/comment/${id}`).then(() => alert("삭제완료!"));
    }
    return;
  };

  const onModify = (id: number) => {
    setClickCommentID(id);
    return setModify(true);
  };

  const onModifyComplete = async (id: number, refetch: () => void) => {
    await axios.patch(`/comment/${id}`, {
      commentText: modifyInputValue,
    });
    setModify(false);
    return refetch();
  };

  const onCancle = () => setModify(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyInputValue(e.currentTarget.value);
  };

  return {
    setClickCommentID,
    modifyInputValue,
    clickCommentID,
    modify,
    onDelete,
    onModify,
    onModifyComplete,
    onCancle,
    onChange,
  };
}
