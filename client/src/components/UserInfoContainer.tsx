import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

const UserInfoBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
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
const UserAvartar = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-right: 15px;
`;
const UserNickname = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const UserMenuBox = styled.ul`
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  height: 25%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
`;

interface UserMenuProps {
  urlMatch: boolean;
}
const UserMenu = styled.li<UserMenuProps>`
  margin-right: 50px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;

    &:hover {
      color: #0092fa;
    }
    border-bottom: ${(props) => (props.urlMatch ? "3px solid #0092fa;" : null)};
    color: ${(props) => (props.urlMatch ? "#0092fa;" : null)};
  }
`;

interface IUserID {
  userId: string | undefined;
}

export default function UserInfoContainer({ userId }: IUserID) {
  const location = useLocation();

  const urlArticleMatch = location.pathname === `/user/${userId}/article`;
  const urlCommentMatch = location.pathname !== `/user/${userId}/article`;

  return (
    <UserInfoBox>
      <UserInfo>
        <UserAvartar src="https://graph.facebook.com/555897032021233/picture?width=100&height=100" />
        <UserNickname>김민겸</UserNickname>
      </UserInfo>
      <UserMenuBox>
        <UserMenu urlMatch={urlArticleMatch}>
          <Link to={`/user/${userId}/article`}>게시물</Link>
        </UserMenu>
        <UserMenu urlMatch={urlCommentMatch}>
          <Link to={`/user/${userId}/comment`}>댓글</Link>
        </UserMenu>
      </UserMenuBox>
    </UserInfoBox>
  );
}
