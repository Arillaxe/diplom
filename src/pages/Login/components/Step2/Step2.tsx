import { useState } from 'react';
import { Card, Heading, TextInputField, Button } from 'evergreen-ui';
import API from '../../../../lib/api';

type propTypes = {
  firstSignIn: boolean;
  login: string;
  next: (args: { token: string, user: any }) => void;
}

const Step2 = (props: propTypes) => {
  const { firstSignIn, login, next } = props;

  const [fullNameInput, setFullNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async () => {
    if (loading || !fullNameInput.trim() || !passwordInput) return;

    if (firstSignIn && passwordInput !== passwordConfirmInput) {
      setErrorMessage('Пароли не совпадают');

      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const { user, accessToken } = await API.signIn({ login, fullName: fullNameInput, password: passwordInput });

      setLoading(false);

      next({ user, token: accessToken });
    } catch (e) {
      setLoading(false);

      if (e.response.status === 400) {
        setErrorMessage('Неверное ФИО или пароль');
      } else {
        setErrorMessage(e.toString());
      }
    }
  };

  return (
    <Card background="white" padding="15px" display="flex" flexDirection="column" width="300px">
      <Heading marginBottom="15px" size={600}>Войти</Heading>
      <TextInputField
        marginBottom="15px"
        label="ФИО"
        placeholder="ФИО"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullNameInput(e.target.value)}
      />
      {firstSignIn && (
        <>
          <TextInputField
            marginBottom="15px"
            label="Пароль"
            placeholder="Пароль"
            type="password"
            description="Это ваш первый вход в аккаунт, пожалуйста, установите пароль"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
          />
          <TextInputField
            marginBottom="15px"
            label="Потвердите пароль"
            placeholder="Пароль"
            type="password"
            validationMessage={errorMessage || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && signIn()}
          />
        </>
      )}
      {!firstSignIn && (
        <TextInputField
          marginBottom="15px"
          label="Пароль"
          placeholder="Пароль"
          type="password"
          validationMessage={errorMessage || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && signIn()}
        />
      )}
      <Button
        appearance="primary"
        alignSelf="center"
        onClick={signIn}
        isLoading={loading}
      >Войти</Button>
    </Card>
  );
};

export default Step2;
