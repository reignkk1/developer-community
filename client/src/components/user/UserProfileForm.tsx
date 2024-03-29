import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';
import { useState } from 'react';

// File
import Button from '../common/button';
import InputContainer from '../auth/InputContainer';
import styled from '@emotion/styled';
import useLoginUser from '../../hooks/useLoginUser';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 25px;
  }
`;

// =============================================================================

interface IProfileData {
  name: string;
  nickname: string;
}

// =============================================================================
export default function UserProgileForm() {
  // 유저 프로필 정보 가져오기
  const loginUser = useLoginUser();

  // name input 상태
  const [name, setName] = useState(loginUser?.name);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  // nickname input 상태
  const [nickName, setNickName] = useState(loginUser?.nickname);

  const onNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  const { register, handleSubmit, watch } = useForm<IProfileData>();

  // Form Submit
  const onValid = () => {
    axios
      .patch('/user/profile', { name: name, nickname: nickName })
      .then(() => alert('변경이 완료되었습니다!'));
  };

  // Form Error
  const oninvalid = (error: FieldErrors) => {
    if (error.name?.message) return alert(`${error.name.message}`);
    if (error.nickname?.message) return alert(`${error.nickname.message}`);
  };

  return (
    <Form onSubmit={handleSubmit(onValid, oninvalid)}>
      <InputContainer
        register={register}
        label="이름"
        placeholder={watch('name') === '' ? '이름을 입력해주세요!' : ''}
        type="text"
        name="name"
        required={true}
        onChange={onNameChange}
        defaultValue={loginUser?.name}
      />
      <InputContainer
        register={register}
        label="닉네임"
        placeholder={watch('nickname') === '' ? '닉네임을 입력해주세요!' : ''}
        type="text"
        name="nickName"
        required={true}
        onChange={onNickNameChange}
        defaultValue={loginUser?.nickname}
      />

      <Button>저장</Button>
    </Form>
  );
}
