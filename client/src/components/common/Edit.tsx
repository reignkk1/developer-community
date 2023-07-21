import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditer from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

// File
import { IPost, IPage } from '../../types/types';
import Button from './button';
import { useGetAxios, usePatchAxios } from '../../hooks/api/http';

// =============================================================================

const Container = styled.div`
  width: 60%;
  height: 120vh;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  @media (max-width: 850px) {
    width: 80%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  padding: 5px 15px;
  outline: none;
  background-color: ${props => props.theme.inputColor};
  border: 2px solid ${props => props.theme.borderColor};
  color: ${props => props.theme.textColor};
  &:focus {
    border: 2px solid #0092fa;
  }
`;

const Title = styled.div`
  text-align: start;
  font-size: 15px;
  margin-bottom: 5px;
`;

// =============================================================================

export default function Edit({ page }: IPage) {
  const [inputData, setInputData] = useState('');
  const [editorData, setEditorData] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const onGetSuccess = () => {
    setInputData(data?.title || '');
    setEditorData(data?.content || '');
  };

  const onPatchSuccess = () => navigate(`/${page}`);

  const { data, isLoading, error } = useGetAxios<IPost>(
    `/article/${id}`,
    onGetSuccess
  );

  const patchData = {
    title: inputData,
    content: editorData,
  };
  const { mutate: editPost } = usePatchAxios(
    `/article/${id}`,
    patchData,
    onPatchSuccess
  );

  const postSubmit = () => {
    if (inputData === '') return alert('제목을 입력해주세요!');
    if (editorData === '') return alert('내용을 입력해주세요!');
    if (window.confirm('수정 하시겠습니까?')) return editPost();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setInputData(title);
  };

  return (
    <Container className="editWrite">
      <Title>제목</Title>
      <Input
        type="text"
        placeholder="제목을 입력해주세요!"
        onChange={onChangeInput}
        required
        value={isLoading ? '로딩중..' : error ? '404 Not Found' : inputData}
      />
      <Title>본문</Title>
      <CKEditor
        editor={ClassicEditer}
        onChange={(event, editor) => {
          const editorData = editor.getData();

          setEditorData(editorData);
        }}
        data={isLoading ? '로딩중..' : error ? '404 Not Found' : editorData}
      />

      <Button onClick={postSubmit}>수정하기</Button>
    </Container>
  );
}
