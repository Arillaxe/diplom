import { useHistory } from 'react-router-dom';

export const Redirecter = () => {
  const history = useHistory();

  if (history.location.pathname === '/') {
    const token = localStorage.getItem('token');

    history.push(token ? '/requests' : '/login');
  }

  return null;
};
