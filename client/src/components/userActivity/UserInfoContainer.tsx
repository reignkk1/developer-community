import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

// File
import { IUserData } from "../../type";
import { ErrorBox, LoadingBox } from "../common/LoadingError";
import Avartar from "../common/Avartar";
import { userInfoGet } from "../../axios";
import {
  UserInfo,
  UserInfoBox,
  UserMenu,
  UserMenuBox,
  UserNickname,
} from "./styles";

// =============================================================================

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
  const { isLoading, data, error } = useQuery<IUserData>(
    `[nickname,${userId}]`,
    () => userInfoGet(userId)
  );

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
