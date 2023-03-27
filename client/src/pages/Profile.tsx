import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

// File
import MyPageMenu from "../components/userProfile/MyPageMenu";
import { logined } from "../atom";
import UserForm from "./../components/userProfile/userForm";
import axios from "axios";
import { useState } from "react";

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

const Input = styled.input`
  display: none;
`;

const Form = styled.form``;

// =============================================================================

export default function Profile() {
  const loginState = useRecoilValue(logined);

  const [image, setImage] = useState(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadImage = e.target.files![0];
    const formData = new FormData();
    formData.append("image", uploadImage);

    axios.post("/upload", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  };

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget[0]);
  };

  return loginState ? (
    <Main>
      <MyPageMenu />
      <UserContainer>
        <UserInfoBox>
          <UserInfo>
            <Title>회원정보</Title>
            <UserForm />
          </UserInfo>
          <UserAvartarContainer>
            <UserAvartar
              src="https://graph.facebook.com/555897032021233/picture?width=200&height=200"
              alt="프로필"
            />
            <Form onSubmit={onsubmit}>
              <UserAvartarModal htmlFor="image">변경</UserAvartarModal>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e)}
              />
              <button>변경</button>
            </Form>
          </UserAvartarContainer>
        </UserInfoBox>
      </UserContainer>
    </Main>
  ) : (
    <Navigate to="/login" />
  );
}
