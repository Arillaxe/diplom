import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RoleRedirecter = () => {
  const user = useSelector(({ app }: { app: any }) => app.user);
  const history = useHistory();

  useEffect(() => {
    if (user.roles && user.roles.indexOf('admin') !== -1 && history.location.pathname === '/') {
      history.push('/users');
    }
  }, [user]);

  return null;
};

export default RoleRedirecter;
