import styled from '@emotion/styled';
import { usePostAxios } from '../../hooks/api/http';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { ILoginUserProp } from '../../types/types';

// =============================================================================

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 92%;
  height: 40px;
  outline: none;
  border: 2px solid #0092fa;
  font-size: 16px;
  padding: 0px 10px;
  font-weight: bold;
  background-color: ${props => props.theme.inputColor};
  color: ${props => props.theme.textColor};
`;

const Btn = styled.button`
  width: 8%;
  background-color: #0092fa;
  border: none;
  cursor: pointer;
  font-size: 16px;
  @media (max-width: 940px) {
    font-size: 14px;
    width: 10%;
  }
`;

// =============================================================================

export default function GuestBookInput({ loginUser }: ILoginUserProp) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [inputData, setInputData] = useState('');

  const data = {
    title: inputData,
    content: inputData,
    date: new Date().toLocaleDateString('ko-kr'),
  };
  const onSuccess = () =>
    queryClient.invalidateQueries(['GET', '/article/guest-book/all']);

  const { mutate: createGuestBook } = usePostAxios(
    '/article/guest-book',
    data,
    onSuccess
  );

  const onClick = () => {
    if (!loginUser) return navigate('/login');
    if (!inputData) return alert('내용을 입력해주세요!');
    setInputData('');
    createGuestBook();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData(e.target.value);

  return (
    <InputContainer>
      <Input onChange={onChange} value={inputData} />
      <Btn onClick={onClick}>작성</Btn>
    </InputContainer>
  );
}
