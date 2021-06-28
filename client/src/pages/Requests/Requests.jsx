import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Tag,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import api from '../../lib/api';
import { Header } from '../../components';
import { CreateRequestModal } from './modals';

const STATUS_MAP = {
  'DEKANAT_VERIFY': { title: 'На рассмотрении деканатом', color: 'blue' },
  'ADMIN_VERIFY': { title: 'На рассмотрении администратором', color: 'blue' },
  'APPROVED': { title: 'Одобрена', color: 'green' },
  'REJECTED': { title: 'Отклонена', color: 'red' },
}

export const Requests = () => {
  const [requests, setRequests] = useState([]); //useState([{ id: 1, roomId: 2, userId: 0, status: 'DEKANAT_VERIFY', createdAt: new Date(), room: { hostel: 'АБиП', floor: 1, room: 103, place: 1 }  }]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);

  const getRequests = async () => {
    const token = localStorage.getItem('token');

    const { request } = await api.getCurrentRequest({ token });

    if (request) {
      setRequests([request]);
    } else {
      setRequests([]);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  const onCreateSubmit = async (request) => {
    const token = localStorage.getItem('token');

    await api.createRequest({ token, request });
    await getRequests();

    setIsModalOpened(false);
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem('token');

    await api.deleteRequest({ token, id });
    await getRequests();
  };

  return (
    <Box minHeight="100vh" background="#f9fafc">
      <Header />
      <Center mt="30px">
        <Flex w="900px" p="30px" background="#fff" borderRadius="5px" direction="column">
          <Flex width="100%" mb="20px">
            <Heading color="gray.700">Заявки</Heading>
            <Spacer />
            <Button colorScheme="green" onClick={openModal}>Создать заявку на поселение</Button>
          </Flex>
          <Flex>
            {requests.map((request) => {
              const { hostel, floor, room, place, status, createdAt, id } = request;
              const { title: statusTitle, color: statusColor } = STATUS_MAP[status];


              return (
                <Flex direction="column">
                  <Flex>
                    <Heading size="md" color="gray.700" mr="10px">Заявка на поселение</Heading>
                    <Tag colorScheme={statusColor}>{statusTitle}</Tag>
                  </Flex>
                  <Text>Общежитие: {hostel}</Text>
                  <Text>Комната: {floor} этаж, {room} комната, {place} место</Text>
                  <Text>Заявка была создана {moment(createdAt).fromNow()}</Text>
                  <Button onClick={() => onDelete(id)} size="xs" mt="10px" alignSelf="flex-start" colorScheme="red" rightIcon={<DeleteIcon />}>Удалить заявку</Button>
                </Flex>
              );
            })}
            {!requests.length && <Text>У вас нет заявок</Text>}
          </Flex>
        </Flex>
      </Center>
      <CreateRequestModal isOpen={isModalOpened} onClose={closeModal} onSubmit={onCreateSubmit} />
    </Box>
  );
};
