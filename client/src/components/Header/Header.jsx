import { useHistory, Link as RLink } from 'react-router-dom';
import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Link,
} from '@chakra-ui/react';

export const Header = () => {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <Center padding="10px 30px 10px" background="blue.900" boxShadow="0 1px 3px 0 rgb(0 0 0 / 20%)">
      <Flex w="100%" alignItems="center" maxWidth="900px">
        <Heading size="lg" color="white">Хочу в общежитие</Heading>
        <Spacer />
        <RLink to="/requests">
          <Link fontSize="lg" color="white" mr="15px">Заявки</Link>
        </RLink>
        <RLink to="/profile">
          <Link fontSize="lg" color="white" mr="15px">Профиль</Link>
        </RLink>
        <Button fontSize="lg" color="white" colorScheme="blue" onClick={logOut}>Выйти</Button>
      </Flex>
    </Center>
  );
};
