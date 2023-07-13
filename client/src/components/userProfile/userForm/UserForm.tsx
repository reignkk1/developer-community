import axios from "axios";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";
import { useState } from "react";

// File
import Button from "../../common/button";
import { Form } from "./styles";
import InputContainer from "../../common/InputContainer";
import { useGetAxios } from "../../../hooks/api/Article";
import { IUserData } from "../../../types";

// =============================================================================

interface IProfileData {
  name: string;
  nickname: string;
}

// =============================================================================
export default function UserForm() {
  // 유저 프로필 정보 가져오기
  const { data } = useGetAxios<IUserData>("/user/login-info");

  // name input 상태
  const [name, setName] = useState(data?.name);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // nickname input 상태
  const [nickName, setNickName] = useState(data?.nickname);
  const onNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const { register, handleSubmit, watch } = useForm<IProfileData>();

  // Form Submit
  const onValid = () => {
    axios.patch("/user/profile", { name, nickname: nickName }).then(() => {
      return alert("변경이 완료되었습니다!");
    });
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
        placeholder={watch("nickname") === "" ? "닉네임을 입력해주세요!" : ""}
        type="text"
        name="nickName"
        required={true}
        onChange={onNickNameChange}
        defaultValue={data?.nickname}
      />

      <Button>저장</Button>
    </Form>
  );
}
