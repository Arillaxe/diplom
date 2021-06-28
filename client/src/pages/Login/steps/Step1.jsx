import { useState } from 'react';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
} from '@chakra-ui/react';

export const Step1 = (props) => {
  const { onSubmit } = props;

  const [login, setLogin] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLoginChange = (e) => setLogin(e.target.value);

  const onSubmitLocal = async () => {
    if (isLoading || !login.trim()) return;

    setIsLoading(true);
    setError(false);

    try {
      await onSubmit({ login });
    } catch {
      setError(true);
      setIsLoading(false);
    }
  }

  return (
    <Center background="#F9FAFC" h="100vh">
      <Flex direction="column" w="300px" p="15px" background="white" borderRadius="3px" overflow="hidden" position="relative">
        <Heading size="md" mb="10px" color="gray.700">Войти</Heading>
        <FormControl id="email" isInvalid={error} mb="15px">
          <FormLabel>Логин</FormLabel>
          <Input type="email" placeholder="Логин" value={login} onChange={onLoginChange} />
          <FormErrorMessage>Пользователь не найден</FormErrorMessage>
        </FormControl>
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
