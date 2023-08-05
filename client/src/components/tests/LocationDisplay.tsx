import { useLocation } from 'react-router-dom';

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="pathName">{location.pathname}</div>;
};
