import { useEffect } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";

// File
import Button from "../components/button";
import MyPageMenu from "../components/MyPageMenu";

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
const UserAvartar = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 50%;
  margin-top: 50px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

// =============================================================================

interface IProfileData {
  name: string;
  nickname: string;
}

// =============================================================================

export default function Profile() {
  const { register, handleSubmit, setValue, watch } = useForm<IProfileData>();

  const { isLoading, error, data } = useQuery<IProfileData>(
    "user-profile",
    () =>
      axios
        .get("http://localhost:8000/profile", { withCredentials: true })
        .then((response) => response.data[0])
  );

  useEffect(() => {
    setValue("name", isLoading ? "" : error ? "Not Find" : data?.name + "");
    setValue(
      "nickname",
      isLoading ? "" : error ? "Not Find" : data?.nickname + ""
    );
  }, [isLoading]);

  const onValid = (data: IProfileData) => {
    axios
      .patch(
        "http://localhost:8000/profile",
        { name: data.name, nickname: data.nickname },
        { withCredentials: true }
      )
      .then(() => alert("변경이 완료되었습니다!"));
  };

  const oninvalid = (error: FieldErrors) => {
    if (error.name?.message) return alert(`${error.name.message}`);
    if (error.nickname?.message) return alert(`${error.nickname.message}`);
  };
  return (
    <Main>
      <MyPageMenu />
      <UserContainer>
        <UserInfoBox>
          <UserInfo>
            <Title>회원정보</Title>
            <UserForm onSubmit={handleSubmit(onValid, oninvalid)}>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "이름을 입력해주세요!",
                })}
                placeholder={
                  watch("name") === "" ? "이름을 입력해주세요!" : undefined
                }
              />

              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                {...register("nickname", {
                  required: "닉네임을 입력해주세요!",
                })}
                placeholder={
                  watch("nickname") === ""
                    ? "닉네임을 입력해주세요!"
                    : undefined
                }
              />

              <Button text="저장" />
            </UserForm>
          </UserInfo>
          <UserAvartar src="https://graph.facebook.com/555897032021233/picture?width=200&height=200" />
        </UserInfoBox>
      </UserContainer>
    </Main>
  );
}
