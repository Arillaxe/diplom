import { useState } from 'react';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';

export const Step2 = (props) => {
  const { onSubmit, lastSignIn } = props;

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFullNameChange = (e) => setFullName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onPasswordConfirmChange = (e) => setPasswordConfirm(e.target.value);

  const onSubmitLocal = async () => {
    if (isLoading || !fullName.trim() || !password.trim() || (!lastSignIn && !passwordConfirm.trim())) return;

    if (!lastSignIn && password !== passwordConfirm) {
      setError('Пароли не совпадают');

      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({ fullName, password });
    } catch {
      setError('ФИО или пароль неверны');
      setIsLoading(false);
    }
  }

  return (
    <Center background="#F9FAFC" h="100vh">
      <Flex direction="column" w="300px" p="15px" background="white" borderRadius="3px" overflow="hidden" position="relative">
        <Heading size="md" mb="10px" color="gray.700">Войти</Heading>
        <FormControl id="fullName" mb="15px">
          <FormLabel>ФИО</FormLabel>
          <Input type="text" placeholder="ФИО" value={fullName} onChange={onFullNameChange} />
        </FormControl>
        <FormControl id="password" mb="15px">
          <FormLabel>Пароль</FormLabel>
          {!lastSignIn && <FormHelperText pb="10px">Это ваш первый вход в аккаунт, пожалуйста, установите пароль</FormHelperText>}
          <Input type="password" placeholder="Пароль" value={password} onChange={onPasswordChange} />
        </FormControl>
        {!lastSignIn && (
          <FormControl id="password-confirm" isInvalid={error} mb="15px">
            <FormLabel>Подтвердите пароль</FormLabel>
            <Input type="password" placeholder="Пароль" value={passwordConfirm} onChange={onPasswordConfirmChange} />
          </FormControl>
        )}
        {error && <Text mb="10px" color="red.500" fontSize="sm">{error}</Text>}
        <Button colorScheme="blue" alignSelf="center" onClick={onSubmitLocal}>Войти</Button>
        {isLoading && (
          <Center w="100%" h="100%" background="#fff" position="absolute" top="0" left="0">
            <Spinner />
          </Center>
        )}
      </Flex>
    </Center>
  )
};
