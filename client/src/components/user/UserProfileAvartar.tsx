import Avartar from '../common/Avartar';
import axios from 'axios';
import { useGetAxios } from '../../hooks/api/http';
import { IUser } from '../../types/types';
import styled from '@emotion/styled';

const UserAvartarContainer = styled.div`
  img {
    margin-top: 50px;
  }
  @media (max-width: 1065px) {
    text-align: center;
  }
`;

const UserAvartarModal = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 155px;
  height: 155px;
  border-radius: 50%;
  position: absolute;
  top: 150px;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
  @media (max-width: 1065px) {
    left: 50%;
    transform: translate(-50%, -50%);
    top: 406px;
  }
`;

const InputAvartar = styled.input`
  display: none;
`;

export default function UserProfileAvartar() {
  const { data: loginUser } = useGetAxios<IUser>('/user/login-info');

  // 프로필 사진 변경 시
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadImage = e.target.files![0];
    const formData = new FormData();
    formData.append('image', uploadImage);
    await axios.post('/user/upload', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  };
  return (
    <UserAvartarContainer>
      <Avartar width="155px" heigth="155px" src={loginUser?.avartar} />
      <UserAvartarModal htmlFor="image">변경</UserAvartarModal>
      <InputAvartar
        id="image"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </UserAvartarContainer>
  );
}
