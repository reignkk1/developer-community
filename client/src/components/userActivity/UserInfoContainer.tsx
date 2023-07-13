import { Link, useLocation } from "react-router-dom";

// File
import { IUserData } from "../../types";
import { ErrorBox, LoadingBox } from "../common/LoadingError";
import Avartar from "../common/Avartar";
import {
  UserInfo,
  UserInfoBox,
  UserMenu,
  UserMenuBox,
  UserNickname,
} from "./styles";
import { useGetAxios } from "../../hooks/api/Article";

// =============================================================================

export default function UserInfoContainer({
  userId,
}: {
  userId: string | undefined;
}) {
  const location = useLocation();

  const urlArticleMatch = location.pathname === `/user/${userId}/posts`;
  const urlCommentMatch = location.pathname === `/user/${userId}/comments`;

  // 유저정보 Fetch
  const { data, isLoading, error } = useGetAxios<IUserData>(`/user/${userId}`);

  return (
    <UserInfoBox>
      <UserInfo>
        <Avartar width="70px" heigth="70px" src={data?.avartar} />
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox />
        ) : (
          <UserNickname>{data?.nickname}</UserNickname>
        )}
      </UserInfo>
      <UserMenuBox>
        <UserMenu urlMatch={urlArticleMatch}>
          <Link to={`/user/${userId}/posts`}>게시물</Link>
        </UserMenu>
        <UserMenu urlMatch={urlCommentMatch}>
          <Link to={`/user/${userId}/comments`}>댓글</Link>
        </UserMenu>
      </UserMenuBox>
    </UserInfoBox>
  );
}
