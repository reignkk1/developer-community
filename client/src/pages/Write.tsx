import { useState } from 'react';
import styled from '@emotion/styled';
import { Navigate, useNavigate } from 'react-router-dom';

// File
import Button from '../components/common/button';
import useLoginUser from '../hooks/useLoginUser';
import { DateToday } from '../utils/DateToday';
import { useMutation } from 'react-query';
import { createPost } from '../api/http';
import ReactEditor from '../components/common/Editor';
import InputText from '../components/common/InputText';
import useCurrentSection from '../hooks/useCurrentSection';

// =============================================================================

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 100px;

  @media (max-width: 850px) {
    width: 80%;
  }
`;

const Title = styled.div`
  text-align: start;
  font-size: 15px;
  margin-bottom: 5px;
`;

const Editor = styled(ReactEditor)`
  margin-bottom: 50px;

  .ql-editor {
    min-height: 500px;
    font-size: 15.5px;
    line-height: 1.8;
    &:focus {
      border: 2px solid #0092fa;
    }
  }
`;

// =============================================================================

export default function Write() {
  const navigate = useNavigate();
  const currentSection = useCurrentSection() || '';

  const [editorData, setEditorData] = useState({
    title: '',
    content: '',
  });
  const data = {
    title: editorData.title,
    content: editorData.content,
    date: DateToday(),
  };
  const onSuccess = () => navigate(`/${currentSection}`);

  const loginUser = useLoginUser();

  const { mutate: createMutate } = useMutation(
    createPost(currentSection, data),
    {
      onSuccess,
    }
  );

  const postSubmit = () => {
    if (editorData.title === '') return alert('제목을 입력해주세요!');
    if (editorData.content === '') return alert('내용을 입력해주세요!');

    createMutate();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditorData({ ...editorData, title });
  };

  return loginUser ? (
    <Container>
      <InputText
        label="제목"
        placeholder="제목을 입력해주세요!"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
        required={true}
        value={editorData.title}
      />
      <Title>본문</Title>
      <Editor
        onChange={(content: string) => {
          setEditorData({
            ...editorData,
            content,
          });
        }}
      />

      <Button onClick={postSubmit}>작성하기</Button>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
