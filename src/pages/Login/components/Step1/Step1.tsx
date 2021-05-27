import { useState } from 'react';
import { Card, Heading, TextInputField, Button } from 'evergreen-ui';
import API from '../../../../lib/api';

type propsType = {
  next: (args: { login: string, lastSignIn: Date }) => void;
}

const Step1 = (props: propsType) => {
  const { next } = props;

  const [loginInput, setLoginInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkUserExists = async () => {
    if (loading || !loginInput.trim()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const { exists, lastSignIn } = await API.userExists({ login: loginInput });

      setLoading(false);

      if (!exists) {
        setErrorMessage('Пользователь не найден');

        return;
      }

      next({ login: loginInput, lastSignIn });
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.toString());
    }
  };

  return (
    <Card background="white" padding="15px" display="flex" flexDirection="column" width="300px">
      <Heading marginBottom="15px" size={600}>Войти</Heading>
      <TextInputField
        marginBottom="15px"
        label="Логин"
        placeholder="Логин"
        name="login"
        validationMessage={errorMessage || false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginInput(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && checkUserExists()}
      />
      <Button
        appearance="primary"
        alignSelf="center"
        onClick={checkUserExists}
        isLoading={loading}
      >Войти</Button>
    </Card>
  );
};

export default Step1;
