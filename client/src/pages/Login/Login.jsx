import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import appSlice from '../../app.slice';
import api from '../../lib/api';
import { Step1, Step2 } from './steps';

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [lastSignIn, setLastSignIn] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) history.push('/');
  }, [history]);

  const onStep1Submit = async ({ login }) => {
    const { exists, lastSignIn } = await api.userExists({ login });

    if (!exists) throw new Error();

    setLogin(login);
    setLastSignIn(lastSignIn);
    setCurrentStep(1);
  };

  const onStep2Submit = async ({ fullName, password }) => {
    const { user, accessToken } = await api.signIn({ login, fullName, password });

    localStorage.setItem('token', accessToken);
    dispatch(appSlice.actions.setUser(user));
    history.push('/requests');
  };

  return (
    <>
      {currentStep === 0 && <Step1 onSubmit={onStep1Submit} />}
      {currentStep === 1 && <Step2 onSubmit={onStep2Submit} lastSignIn={lastSignIn} />}
    </>
  )
};
