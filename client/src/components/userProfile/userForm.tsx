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
  const { isLoading, error, data, refetch } = useQuery<IProfileData>(
    "user-profile",
    () => profileUserInfoGet(setName, setNickName),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const [name, setName] = useState(data?.name);
  const [nickName, setNickName] = useState(data?.nickname);

  const { register, handleSubmit, watch } = useForm<IProfileData>();

  const onValid = (data: IProfileData) => {
    axios
      .patch(
        "/user/profile",
        { name: data.name, nickname: data.nickname },
        { withCredentials: true }
      )
      .then(() => {
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
        value={isLoading ? "" : error ? "Not Found" : name}
        {...register("name", {
          required: "이름을 입력해주세요!",
        })}
        onChange={onNameChange}
        placeholder={watch("name") === "" ? "이름을 입력해주세요!" : undefined}
      />

      <Label htmlFor="nickname">닉네임</Label>
      <Input
        id="nickname"
        value={isLoading ? "" : error ? "Not Found" : nickName}
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
