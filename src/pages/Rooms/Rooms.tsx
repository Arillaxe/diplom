import { useEffect, useState } from 'react';
import moment from 'moment';
import { Pane, Table, Button, EditIcon, IconButton, TrashIcon, CameraIcon } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { AddRoom, EditRoom, RoomPhoto } from '..';
import API from '../../lib/api';
import { formType } from '../AddRoom/AddRoom';

moment.locale('ru');

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [createDialogShown, setCreateDialogShown] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [photoDialogShown, setPhotoDialogShown] = useState(false);
  const [editRoom, setEditRoom] = useState<formType>({
    hostel: '',
    floor: 0,
    room: 0,
    place: 0,
  });

  const getRooms = async () => {
    const token = localStorage.getItem('token') || '';
    const rooms = await API.getRooms({ token });

    setRooms(rooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const submitCreateRoom = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.createRoom({ token, formData });

      NotificationManager.success('Комната создана');

      setCreateDialogShown(false);
      getRooms();
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const submitEditRoom = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.updateRoom({ token, formData });

      NotificationManager.success('Комната обновлена');

      setEditDialogShown(false);
      getRooms();
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  }

  const deleteRoom = async (roomId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.deleteRoom({ token, roomId });

      NotificationManager.success('Комната удалена');

      getRooms();
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const submitRoomPhoto = () => {

  };

  return (
    <Pane display="flex" justifyContent="center" marginTop="15px">
      <Pane width="100%" display="flex" flexDirection="column">
        <Button appearance="primary" marginBottom="15px" marginRight="15px" alignSelf="flex-end" onClick={() => setCreateDialogShown(true)}>Добавить комнату</Button>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Общежитие</Table.TextHeaderCell>
            <Table.TextHeaderCell>Этаж</Table.TextHeaderCell>
            <Table.TextHeaderCell>Комната</Table.TextHeaderCell>
            <Table.TextHeaderCell>Место</Table.TextHeaderCell>
            <Table.TextHeaderCell>ID пользователя</Table.TextHeaderCell>
            <Table.TextHeaderCell></Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {rooms.map((room: any) => (
              <Table.Row key={room.id}>
                <Table.TextCell>{room.hostel}</Table.TextCell>
                <Table.TextCell>{room.floor}</Table.TextCell>
                <Table.TextCell>{room.room}</Table.TextCell>
                <Table.TextCell>{room.place}</Table.TextCell>
                <Table.TextCell>{room.userId}</Table.TextCell>
                <Table.Cell>
                  <IconButton icon={EditIcon} marginRight="10px" onClick={() => { setEditRoom(room); setEditDialogShown(true); }} />
                  <IconButton icon={CameraIcon} marginRight="10px" onClick={() => { setPhotoDialogShown(true); }} />
                  <IconButton icon={TrashIcon} onClick={() => deleteRoom(room.id)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>

      <AddRoom isShown={createDialogShown} setIsShown={setCreateDialogShown} onSubmit={submitCreateRoom} />
      <EditRoom isShown={editDialogShown} setIsShown={setEditDialogShown} onSubmit={submitEditRoom} room={editRoom} />
      <RoomPhoto isShown={photoDialogShown} setIsShown={setPhotoDialogShown} onSubmit={submitRoomPhoto} />
    </Pane>
  );
};

export default Rooms;
