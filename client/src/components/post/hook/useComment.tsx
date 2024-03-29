import axios from 'axios';
import { useState } from 'react';

export default function useComment() {
  const [modify, setModify] = useState(false);
  const [clickCommentID, setClickCommentID] = useState<number>();
  const [modifyInputValue, setModifyInputValue] = useState('');
  const [commentWrite, setCommentWrite] = useState(false);

  const handleToggleWrite = (id: number) => {
    setClickCommentID(id);
    setCommentWrite(prev => !prev);
  };

  const onDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하겠습니까?')) {
      await axios.delete(`/comment/${id}`);
      alert('삭제완료!');
    }
    return;
  };

  const onModify = (id: number) => {
    setClickCommentID(id);
    return setModify(true);
  };

  const onModifyComplete = async (id: number) => {
    await axios.patch(`/comment/${id}`, {
      commentText: modifyInputValue,
    });
    alert('수정완료!');
    setModify(false);
  };

  const onCancle = () => setModify(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setModifyInputValue(e.currentTarget.value);

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
    handleToggleWrite,
    commentWrite,
    setCommentWrite,
  };
}
