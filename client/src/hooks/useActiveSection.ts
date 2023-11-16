import { useLocation } from 'react-router-dom';
import sectionPost from '../sectionPost.json';

export default function useActiveSection() {
  const { pathname } = useLocation();
  const cleanedPath = pathname.split(' ')[0];

  // sectionPost.routes.forEach(({section})=>{
  //   if(pathname.startsWith())
  // })

  if (cleanedPath === '/') {
    return 'home';
  } else if (pathname.startsWith('/notice')) {
    return 'notice';
  } else if (pathname.startsWith('/life')) {
    return 'life';
  } else if (pathname.startsWith('/tech')) {
    return 'tech';
  } else if (pathname.startsWith('/guest-book')) {
    return 'guest-book';
  } else if (pathname.startsWith('/game')) {
    return 'game';
  } else if (pathname.startsWith('/login')) {
    return 'login';
  } else if (pathname.startsWith('/signup')) {
    return 'signup';
  } else if (pathname.startsWith('/profile')) {
    return 'profile';
  } else if (pathname.startsWith('/account')) {
    return 'account';
  } else if (pathname.startsWith('/search')) {
    return 'search';
  } else if (pathname.startsWith('/user')) {
    return 'user';
  } else if (pathname.endsWith('/edit')) {
    return 'edit';
  } else if (pathname.endsWith('/write')) {
    return 'write';
  } else if (pathname.endsWith('/withdraw-confirm')) {
    return 'withdraw-confirm';
  } else if (pathname.endsWith('/password-change')) {
    return 'password-change';
  }
}
