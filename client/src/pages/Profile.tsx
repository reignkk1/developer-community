import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

// File
import MyPageMenu from "../components/userProfile/MyPageMenu";
import { avartarUrl, logined } from "../atom";

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { profileUserInfoGet } from "../axios";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form";

import InputContainer from "../components/InputContainer";
import Button from "../components/button/button";

// =============================================================================

const Main = styled.main`
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`;
const UserContainer = styled.div`
  width: 75%;
`;
const UserInfoBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 0px 20px 70px;
`;
const UserInfo = styled.div`
  width: 60%;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 40px;
`;

const UserAvartar = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 50px;
`;

const UserAvartarContainer = styled.div`
  position: relative;
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
  top: 50px;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
`;

const InputAvartar = styled.input`
  display: none;
`;

const FormAvartar = styled.form``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 30px;
  }
`;

interface IProfileData {
  name: string;
  nickname: string;
}
// =============================================================================

export default function Profile() {
  // 로그인 상태
  const loginState = useRecoilValue(logined);

  const [avartarURL, setAvartarURL] = useRecoilState(avartarUrl);

  // 유저 프로필 정보 Fetch
  const { data, refetch } = useQuery<IProfileData>(
    "user-profile",
    () => profileUserInfoGet(),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const { register, handleSubmit, watch } = useForm<IProfileData>();

  const [name, setName] = useState(""); // name input 상태
  const [nickName, setNickName] = useState(""); // nickname input 상태

  // 닉네임, 이름 변경 시
  const onValid = () => {
    axios.patch("/user/profile", { name, nickname: nickName }).then(() => {
      refetch();
      return alert("변경이 완료되었습니다!");
    });
  };

  const oninvalid = (error: FieldErrors) => {
    if (error.name?.message) return alert(`${error.name.message}`);
    if (error.nickname?.message) return alert(`${error.nickname.message}`);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  // 프로필 사진 변경 시
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadImage = e.target.files![0];
    const formData = new FormData();
    formData.append("image", uploadImage);
    const response = await axios.post("/user/upload", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });

    setAvartarURL(response.data);
  };

  return loginState ? (
    <Main>
      <MyPageMenu />
      <UserContainer>
        <UserInfoBox>
          <UserInfo>
            <Title>회원정보</Title>
            <Form onSubmit={handleSubmit(onValid, oninvalid)}>
              <InputContainer
                register={register}
                label="이름"
                placeholder={watch("name") === "" ? "이름을 입력해주세요!" : ""}
                type="text"
                name="name"
                required={true}
                onChange={onNameChange}
                defaultValue={data?.name}
              />
              <InputContainer
                register={register}
                label="닉네임"
                placeholder={
                  watch("nickname") === "" ? "닉네임을 입력해주세요!" : ""
                }
                type="text"
                name="nickName"
                required={true}
                onChange={onNickNameChange}
                defaultValue={data?.nickname}
              />
              <Button>저장</Button>
            </Form>
          </UserInfo>
          <UserAvartarContainer>
            <UserAvartar src={avartarURL} alt="프로필" />
            <FormAvartar>
              <UserAvartarModal htmlFor="image">변경</UserAvartarModal>
              <InputAvartar
                id="image"
                type="file"
                accept="image/*"
                onChange={onChange}
              />
            </FormAvartar>
          </UserAvartarContainer>
        </UserInfoBox>
      </UserContainer>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
