import { useEffect, useState } from 'react';
import moment from 'moment';
import { Pane, Table, Button, EditIcon, IconButton, TrashIcon } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { AddUser, EditUser } from '..';
import API from '../../lib/api';
import { formType } from '../AddUser/AddUser';

moment.locale('ru');

const Users = () => {
  const [users, setUsers] = useState([]);
  const [createDialogShown, setCreateDialogShown] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [editUser, setEditUser] = useState<formType>({
    lastName: '',
      name: '',
      surname: '',
      contractNumber: '',
      phone: '',
      email: '',
      roles: [],
  });

  const getUsers = async () => {
    const token = localStorage.getItem('token') || '';
    const users = await API.getUsers({ token });

    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const submitCreateUser = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.createUser({ token, formData });

      NotificationManager.success('Пользователь создан');

      setCreateDialogShown(false);
      getUsers();
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const submitEditUser = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.updateUser({ token, formData });

      NotificationManager.success('Пользователь обновлен');

      setEditDialogShown(false);
      getUsers();
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  }

  const deleteUser = async (userId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.deleteUser({ token, userId });

      NotificationManager.success('Пользователь удален');

      getUsers();
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  return (
    <Pane display="flex" justifyContent="center" marginTop="15px">
      <Pane width="100%" display="flex" flexDirection="column">
        <Button appearance="primary" marginBottom="15px" marginRight="15px" alignSelf="flex-end" onClick={() => setCreateDialogShown(true)}>Добавить пользователя</Button>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>ID</Table.TextHeaderCell>
            <Table.TextHeaderCell>ФИО</Table.TextHeaderCell>
            <Table.TextHeaderCell>Договор</Table.TextHeaderCell>
            <Table.TextHeaderCell>Телефон</Table.TextHeaderCell>
            <Table.TextHeaderCell>Почта</Table.TextHeaderCell>
            <Table.TextHeaderCell>Роли</Table.TextHeaderCell>
            <Table.TextHeaderCell>Создан</Table.TextHeaderCell>
            <Table.TextHeaderCell>Изменен</Table.TextHeaderCell>
            <Table.TextHeaderCell></Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {users.map((user: any) => (
              <Table.Row key={user.id}>
                <Table.TextCell>{user.id}</Table.TextCell>
                <Table.TextCell>{`${user.lastName} ${user.name} ${user.surname}`}</Table.TextCell>
                <Table.TextCell>{user.contractNumber}</Table.TextCell>
                <Table.TextCell>{user.phone}</Table.TextCell>
                <Table.TextCell>{user.email}</Table.TextCell>
                <Table.TextCell>{user.roles.join(' ')}</Table.TextCell>
                <Table.TextCell>{moment(user.createdAt).fromNow()}</Table.TextCell>
                <Table.TextCell>{moment(user.updatedAt).fromNow()}</Table.TextCell>
                <Table.Cell>
                  <IconButton icon={EditIcon} marginRight="10px" onClick={() => { setEditUser(user); setEditDialogShown(true); }} />
                  <IconButton icon={TrashIcon} onClick={() => deleteUser(user.id)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>

      <AddUser isShown={createDialogShown} setIsShown={setCreateDialogShown} onSubmit={submitCreateUser} />
      <EditUser isShown={editDialogShown} setIsShown={setEditDialogShown} onSubmit={submitEditUser} user={editUser} />
    </Pane>
  );
};

export default Users;
