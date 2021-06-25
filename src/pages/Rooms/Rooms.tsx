import { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { Pane, Button, EditIcon, IconButton, TrashIcon, CameraIcon } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { AddRoom, EditRoom, RoomPhoto, Base } from '..';
import { Table, More, Pagination } from '../../components';
import API from '../../lib/api';
import { formType } from '../AddRoom/AddRoom';

moment.locale('ru');

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(50);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [createDialogShown, setCreateDialogShown] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [photoDialogShown, setPhotoDialogShown] = useState(false);
  const [editRoom, setEditRoom] = useState<formType>({
    hostel: '',
    floor: 0,
    room: 0,
    place: 0,
  });

  const getRooms = async (page: number) => {
    const token = localStorage.getItem('token') || '';
    const { rooms, total } = await API.getRooms({ token, offset: (page - 1) * 50, limit: 50 });

    setTotal(total);
    setRooms(rooms);
  };

  useEffect(() => {
    getRooms(1);
  }, []);

  const submitCreateRoom = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.createRoom({ token, formData });

      NotificationManager.success('Комната создана');

      setCreateDialogShown(false);
      getRooms(1);
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
      getRooms(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  }

  const deleteRoom = async (roomId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.deleteRoom({ token, roomId });

      NotificationManager.success('Комната удалена');

      getRooms(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const submitRoomPhoto = () => {

  };

  const columns = useMemo(() =>[
    {
      Header: 'Общежитие',
      accessor: 'hostel',
    },
    {
      Header: 'Этаж',
      accessor: 'floor',
    },
    {
      Header: 'Комната',
      accessor: 'room',
    },
    {
      Header: 'Место',
      accessor: 'place',
    },
    {
      Header: 'ID пользователя',
      accessor: 'userId',
    },
  ], []);

  const moreOptions = [
    {
      title: 'Добавить комнату',
      action: () => setCreateDialogShown(true),
      isEnabled: () => true,
    },
    {
      title: 'Редактировать комнату',
      action: () => {
        setEditRoom(selectedRows[0]);
        setEditDialogShown(true);
      },
      isEnabled: () => selectedRows.length === 1,
    },
  ];

  const renderMore = () => (<Pane marginRight="15px"><More options={moreOptions} /></Pane>);

  const onPageClickClick = (page: number) => {
    getRooms(page);
    window.scrollTo(0, 0);
  }

  const renderPagination = () => (
    <Pane marginLeft="auto" marginRight="15px">
      <Pagination totalPages={Math.ceil(total / 50)} onNextClick={onPageClickClick} onPrevClick={onPageClickClick}/>
    </Pane>
  );

  const onRowSelect = (rows: any) => {
    setSelectedRows(rows);
  };

  return (
    <Base renderMore={renderMore} renderPagination={renderPagination}>
      <Pane display="flex" justifyContent="center">
        <Pane width="100%" display="flex" flexDirection="column">
          <Table columns={columns} data={rooms} onRowSelect={onRowSelect} />
        </Pane>

        <AddRoom isShown={createDialogShown} setIsShown={setCreateDialogShown} onSubmit={submitCreateRoom} />
        <EditRoom isShown={editDialogShown} setIsShown={setEditDialogShown} onSubmit={submitEditRoom} room={editRoom} />
        <RoomPhoto isShown={photoDialogShown} setIsShown={setPhotoDialogShown} onSubmit={submitRoomPhoto} />
      </Pane>
    </Base>
  );
};

export default Rooms;
