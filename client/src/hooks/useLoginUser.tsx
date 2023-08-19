import { useQuery } from 'react-query';
import { IUser } from '../types/types';
import { getLoginUser } from '../api/http';

export default function useLoginUser() {
  const { data: loginUser } = useQuery<IUser>(['loginUser'], getLoginUser());

  return loginUser;
}
