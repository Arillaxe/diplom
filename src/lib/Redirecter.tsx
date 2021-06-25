import { useHistory } from 'react-router-dom';

const CheckAuth = () => {
  const history = useHistory();

  if (history.location.pathname === '/') {
    const token = localStorage.getItem('token');

    history.push(token ? '/users' : '/login');
  }

  return null;
};

export default CheckAuth;
