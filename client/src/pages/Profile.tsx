import styled from "@emotion/styled";
import MyPageMenu from "../components/MyPageMenu";

import { useQuery } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FieldErrors, FieldValues } from "react-hook-form/dist/types";
import { useEffect, useState } from "react";

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
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 17px;
  &:focus {
    border-color: black;
  }
`;
const Label = styled.label`
  margin-bottom: 5px;
`;

const UserAvartar = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 50%;
  margin-top: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

interface IData {
  name: string;
  nickname: string;
}

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const { isLoading, error, data } = useQuery<IData>("user-profile", () =>
    axios
      .get("http://localhost:8000/profile", { withCredentials: true })
      .then((response) => response.data[0])
  );

  useEffect(() => {
    setName(data?.name + "");
    setNickname(data?.nickname + "");
  }, [data]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onValid = (data: FieldValues) => {
    axios
      .patch(
        "http://localhost:8000/profile",
        { name: data.name, nickname: data.nickname },
        { withCredentials: true }
      )
      .then(() => alert("변경이 완료되었습니다!"));
  };

  const oninvalid = (error: FieldErrors) => {
    console.log(error);
  };
  return (
    <Main>
      <MyPageMenu />
      <UserContainer>
        <UserInfoBox>
          <UserInfo>
            <Title>회원정보</Title>
            <UserForm onSubmit={handleSubmit(onValid, oninvalid)}>
              <Label>이름</Label>
              <Input
                {...register("name", {
                  required: "이름을 입력해주세요!",
                })}
                value={isLoading ? "" : name}
                onChange={onChangeName}
              />
              <Label>닉네임</Label>
              <Input
                {...register("nickname", {
                  required: "닉네임을 입력해주세요!",
                })}
                value={isLoading ? "" : nickname}
                onChange={onChangeNickname}
              />
              <button>확인</button>
            </UserForm>
          </UserInfo>
          <UserAvartar src="https://graph.facebook.com/555897032021233/picture?width=200&height=200" />
        </UserInfoBox>
      </UserContainer>
    </Main>
  );
}
