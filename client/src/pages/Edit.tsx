import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

// File
import { IPost, IPage } from '../types/types';
import Button from '../components/common/button';
import { getPost } from '../api/http';
import { useMutation, useQuery } from 'react-query';
import { editPost } from '../api/http';
import ReactEditor from '../components/common/Editor';
import InputText from '../components/common/InputText';

// =============================================================================

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
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
  }
`;

// =============================================================================

export default function Edit({ page }: IPage) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState('');
  const [editorData, setEditorData] = useState('');

  const { isLoading, error } = useQuery<IPost>(
    ['postDetail', id],
    getPost(id),
    {
      refetchOnWindowFocus: false,
      onSuccess: post => {
        setInputData(post?.title || '');
        setEditorData(post?.content || '');
      },
    }
  );

  const data = {
    title: inputData,
    content: editorData.replace('nwse-resize', 'default'),
  };

  const { mutate: editMutate } = useMutation(editPost(data, id), {
    onSuccess: () => navigate(`/${page}/${id}`),
  });

  const postSubmit = () => {
    if (inputData === '') return alert('제목을 입력해주세요!');
    if (editorData === '') return alert('내용을 입력해주세요!');
    if (window.confirm('수정 하시겠습니까?')) return editMutate();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setInputData(title);
  };

  return (
    <Container>
      <InputText
        label="제목"
        type="text"
        placeholder="제목을 입력해주세요!"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
        required
        value={isLoading ? '로딩중..' : error ? '404 Not Found' : inputData}
      />
      <Title>본문</Title>
      <Editor
        value={editorData}
        onChange={(content: string) => {
          setEditorData(content);
        }}
      />

      <Button onClick={postSubmit}>수정하기</Button>
    </Container>
  );
}
