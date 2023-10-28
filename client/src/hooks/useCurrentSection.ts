import { useLocation } from 'react-router-dom';
export default function useCurrentSection() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/notice')) {
    return 'notice';
  } else if (pathname.startsWith('/life')) {
    return 'life';
  } else if (pathname.startsWith('/tech')) {
    return 'tech';
  } else if (pathname.startsWith('/guest-book')) {
    return 'guest-book';
  }
}
