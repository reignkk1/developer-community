import { useQuery } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";
import { useState } from "react";
import styled from "@emotion/styled";

// File
import Button from "../button";
import { profileUserInfoGet } from "../../axios";

// =============================================================================

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputColor};
  font-size: 17px;
  &:focus {
    border-color: ${(props) => props.theme.textColor};
  }
`;
const Label = styled.label`
  margin-bottom: 5px;
`;

// =============================================================================

interface IProfileData {
  name: string;
  nickname: string;
}

// =============================================================================
export default function UserForm() {
  // 유저 프로필 정보 Fetch
  const { data, refetch } = useQuery<IProfileData>(
    "user-profile",
    () => profileUserInfoGet(),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const [name, setName] = useState(""); // name input 상태
  const [nickName, setNickName] = useState(""); // nickname input 상태

  const { register, handleSubmit, watch } = useForm<IProfileData>();

  // Form Submit
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
  return (
    <Form onSubmit={handleSubmit(onValid, oninvalid)}>
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        defaultValue={data?.name}
        {...register("name", {
          required: "이름을 입력해주세요!",
        })}
        onChange={onNameChange}
        placeholder={watch("name") === "" ? "이름을 입력해주세요!" : undefined}
      />

      <Label htmlFor="nickname">닉네임</Label>
      <Input
        id="nickname"
        defaultValue={data?.nickname}
        {...register("nickname", {
          required: "닉네임을 입력해주세요!",
        })}
        onChange={onNickNameChange}
        placeholder={
          watch("nickname") === "" ? "닉네임을 입력해주세요!" : undefined
        }
      />

      <Button text="저장" />
    </Form>
  );
}
