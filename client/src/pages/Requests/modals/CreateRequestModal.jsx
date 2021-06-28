import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
} from '@chakra-ui/react';

import api from '../../../lib/api';

export const CreateRequestModal = (props) => {
  const { isOpen, onSubmit, onClose } = props;

  const user = useSelector(({ app }) => app.user);

  const [rooms, setRooms] = useState({});
  const [hostel, setHostel] = useState('');
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [place, setPlace] = useState('');
  const [roomId, setRoomId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async () => {
    const token = localStorage.getItem('token');
    const { rooms } = await api.getAllRooms({ token });

    const reduced = rooms.reduce((acc, room) => {
      const { hostel, floor, room: roomNumber, place, id } = room;

      if (!acc[hostel]) acc[hostel] = {};
      if (!acc[hostel][floor]) acc[hostel][floor] = {};
      if (!acc[hostel][floor][roomNumber]) acc[hostel][floor][roomNumber] = {};
      if (!acc[hostel][floor][roomNumber][place]) acc[hostel][floor][roomNumber][place] = { id };

      return acc;
    }, {});

    setRooms(reduced);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const onHostelChange = (e) => {
    setHostel(e.target.value);
    setFloor('');
    setRoom('');
    setPlace('');
  };
  const onFloorChange = (e) => {
    setFloor(e.target.value);
    setRoom('');
    setPlace('');
  };
  const onRoomChange = (e) => {
    setRoom(e.target.value);
    setPlace('');
  };
  const onPlaceChange = (e) => { 
    setPlace(e.target.value);
    setRoomId(rooms[hostel][floor][room][e.target.value].id);
  }

  const onSubmitLocal = async () => {
    const request = {
      hostel,
      floor,
      room,
      place,
      fullName: `${user.lastName} ${user.name} ${user.surname}`,
    };

    setIsLoading(true);

    try {
      await onSubmit(request);
      NotificationManager.success('Заявка успешно созданна');
    } catch {
      NotificationManager.error('Что то пошло не так, попробуйте позже');
    }

    setIsLoading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создать заявку</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl id="hostel" mb="15px">
              <FormLabel>Общежитие</FormLabel>
              <Select placeholder="Выберите общежитие" value={hostel} onChange={onHostelChange}>
                {Object.keys(rooms).map((hostel) => (
                  <option value={hostel}>{hostel}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="floor" mb="15px">
              <FormLabel>Этаж</FormLabel>
              <Select placeholder="Выберите этаж" value={floor} onChange={onFloorChange} isDisabled={!hostel}>
                {Object.keys(hostel ? rooms[hostel] : {}).map((floor) => (
                  <option value={floor}>{floor}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="room" mb="15px">
              <FormLabel>Комната</FormLabel>
              <Select placeholder="Выберите комнату" value={room} onChange={onRoomChange} isDisabled={!floor}>
                {Object.keys(hostel && floor ? rooms[hostel][floor] : {}).map((room) => (
                  <option value={room}>{room}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="place" mb="15px">
              <FormLabel>Место</FormLabel>
              <Select placeholder="Выберите место" value={place} onChange={onPlaceChange} isDisabled={!room}>
                {Object.keys(hostel && floor && room ? rooms[hostel][floor][room] : {}).map((place) => (
                  <option value={place}>{place}</option>
                ))}
              </Select>
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmitLocal} isLoading={isLoading} isDisabled={!(hostel && floor && room && place)}>
            Создать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
