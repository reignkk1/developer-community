import { useRecoilState } from "recoil";
import Avartar from "../../common/Avartar";
import { avartarUrl } from "../../../atom";
import {
  FormAvartar,
  InputAvartar,
  UserAvartarContainer,
  UserAvartarModal,
} from "./styles";
import axios from "axios";

export default function UserAvartar() {
  const [avartarURL, setAvartarURL] = useRecoilState(avartarUrl);

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
  return (
    <UserAvartarContainer>
      <Avartar width="155px" heigth="155px" src={avartarURL} />
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
