import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

// File
import { IUserData } from "../../type";
import { ErrorBox, LoadingBox } from "../LoadingError";
import Avartar from "../Avartar";
import { userInfoGet } from "../../axios";

// =============================================================================

const UserInfoBox = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
`;
const UserInfo = styled.div`
  padding: 10px 30px 10px 30px;
  height: 75%;
  display: flex;
  align-items: center;
`;

const UserNickname = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
`;
const UserMenuBox = styled.ul`
  display: flex;
  align-items: center;
  height: 25%;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgUserInfoMenuColor};
`;

interface UserMenuProps {
  urlMatch: boolean;
}
const UserMenu = styled.li<UserMenuProps>`
  margin-right: 50px;
  font-size: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    color: ${(props) => props.theme.textColor};

    &:hover {
      color: #0092fa;
    }
    border-bottom: ${(props) => (props.urlMatch ? "3px solid #0092fa;" : null)};
    color: ${(props) => (props.urlMatch ? "#0092fa;" : null)};
  }
`;

// =============================================================================

interface IUserID {
  userId: string | undefined;
}
// =============================================================================

export default function UserInfoContainer({ userId }: IUserID) {
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
