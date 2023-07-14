import Avartar from "../../common/Avartar";
import { InputAvartar, UserAvartarContainer, UserAvartarModal } from "./styles";
import axios from "axios";
import { useGetAxios } from "../../../hooks/api/http";
import { IUserData } from "../../../types";

export default function UserAvartar() {
  const { data: loginUser } = useGetAxios<IUserData>("/user/login-info");

  // 프로필 사진 변경 시
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadImage = e.target.files![0];
    const formData = new FormData();
    formData.append("image", uploadImage);
    await axios.post("/user/upload", formData, {
      headers: { "Content-type": "multipart/form-data" },
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
