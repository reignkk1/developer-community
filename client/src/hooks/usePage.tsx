import { useNavigate } from 'react-router-dom';
import { useGetAxios } from './api/http';
import { IUser } from '../types/types';
import { category } from '../store/atom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

export default function usePage(
  page: 'notice' | 'tech' | 'life' | 'guest-book' | 'search'
) {
  const navigate = useNavigate();
  const { data: loginUser } = useGetAxios<IUser>('/user/login-info');
  const setPage = useSetRecoilState(category);

  const onClick = () => {
    loginUser ? navigate('write') : navigate('/login');
  };

  useEffect(() => {
    setPage(page);
  }, [setPage, page]);

  return { loginUser, onClick };
}
