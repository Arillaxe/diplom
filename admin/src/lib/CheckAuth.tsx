import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import API from './api';
import appSlice from '../app.slice';

const CheckAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getUser = async () => {
    const token = localStorage.getItem('token') || '';

    if (!token) return history.push('/login');

    try {
      const userData = await API.getUserWithToken({ token });

      dispatch(appSlice.actions.setUser(userData));
    } catch {
      localStorage.removeItem('token');
      history.push('/login');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return null;
};

export default CheckAuth;
