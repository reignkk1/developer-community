import { Link, useLocation } from 'react-router-dom';

// File
import { IUser } from '../../types/types';
import Avartar from '../common/Avartar';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../api/http';

const UserInfoBox = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
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
  border-top: 1px solid ${props => props.theme.borderColor};
  padding: 20px 30px;
  background-color: ${props => props.theme.bgUserInfoMenuColor};
`;

const UserMenu = styled.li<{ urlMatch: boolean }>`
  margin-right: 50px;
  font-size: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    color: ${props => props.theme.textColor};

    &:hover {
      color: #0092fa;
    }
    border-bottom: ${props => (props.urlMatch ? '3px solid #0092fa;' : null)};
    color: ${props => (props.urlMatch ? '#0092fa;' : null)};
  }
`;

// =============================================================================

interface IUserInfoContainer {
  userId: string | undefined;
}

export default function UserInfoContainer({ userId }: IUserInfoContainer) {
  const location = useLocation();

  const urlArticleMatch = location.pathname === `/user/${userId}/posts`;
  const urlCommentMatch = location.pathname === `/user/${userId}/comments`;

  // 유저정보 Fetch
  const { data: user } = useQuery<IUser>(
    ['user', userId],
    getUserInfo(userId),
    {
      suspense: true,
    }
  );

  return (
    <UserInfoBox>
      <UserInfo>
        <Avartar width="70px" heigth="70px" src={user?.avartar} />
        <UserNickname>{user?.nickname}</UserNickname>
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
