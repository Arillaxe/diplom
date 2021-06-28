import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pane } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { Step1, Step2 } from './components';
import appSlice from '../../app.slice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem('token');

  if (token) history.push('/');

  const [step, setStep] = useState(1);
  const [login, setLogin] = useState('');
  const [firstSignIn, setFirstSignIn] = useState(false);

  const step1Callback = ({ login, lastSignIn }: { login: string, lastSignIn: Date}): void => {
    setLogin(login);
    setFirstSignIn(!Boolean(lastSignIn));
    setStep(2);
  }

  const step2Callback = ({ token, user }: { token: string, user: any }): void => {
    localStorage.setItem('token', token);

    dispatch(appSlice.actions.setUser(user));

    history.push('/');
  }

  return (
    <Pane background="tint2" height="100vh" width="100%" display="flex" justifyContent="center" alignItems="center">
      {step === 1  && <Step1 next={step1Callback} />}
      {step === 2  && <Step2 firstSignIn={firstSignIn} login={login} next={step2Callback} />}
    </Pane>
  );
};

export default Login;
