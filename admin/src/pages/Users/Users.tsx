import { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import moment from 'moment';
import { Pane, Button, EditIcon, IconButton, TrashIcon } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { AddUser, EditUser, Base } from '..';
import { Table, More, Pagination } from '../../components';
import API from '../../lib/api';
import { formType } from '../AddUser/AddUser';

moment.locale('ru');

const Users = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(50);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [createDialogShown, setCreateDialogShown] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [editUser, setEditUser] = useState<formType>({
    lastName: '',
      name: '',
      surname: '',
      birthDate: '',
      documentType: '',
      documentData: '',
      faculty: '',
      studyType: '',
      course: '',
      rating: '100',
      contractNumber: '',
      phone: '',
      email: '',
      roles: [],
  });

  const getUsers = async (page: number) => {
    const token = localStorage.getItem('token') || '';
    const { users, total } = await API.getUsers({ token, offset: (page - 1) * 50, limit: 50 });
    const mappedUsers = users.map((user: any) => ({
      ...user,
      fullName: `${user.lastName} ${user.name} ${user.surname}`,
      roles: user.roles.join(' '),
      createdAt: moment(user.createdAt).fromNow(),
      updatedAt: moment(user.updatedAt).fromNow(),
    }));

    setTotal(total);
    setUsers(mappedUsers);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const submitCreateUser = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.createUser({ token, formData });

      NotificationManager.success('Пользователь создан');

      setCreateDialogShown(false);
      getUsers(1);
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
      getUsers(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  }

  const deleteUser = async (userId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.deleteUser({ token, userId });

      NotificationManager.success('Пользователь удален');

      getUsers(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const columns = useMemo(() =>[
    {
      Header: 'ФИО',
      accessor: 'fullName',
    },
    {
      Header: 'Дата рождения',
      accessor: 'birthDate',
    },
    {
      Header: 'Вид документа',
      accessor: 'documentType',
    },
    {
      Header: 'Данные документа',
      accessor: 'documentData',
    },
    {
      Header: 'Факультет',
      accessor: 'faculty',
    },
    {
      Header: 'Форма обучения',
      accessor: 'studyType',
    },
    {
      Header: 'Курс',
      accessor: 'course',
    },
    {
      Header: 'Рейтинг',
      accessor: 'rating',
    },
    {
      Header: 'Договор',
      accessor: 'contractNumber',
    },
    {
      Header: 'Телефон',
      accessor: 'phone',
    },
    {
      Header: 'Почта',
      accessor: 'email',
    },
    {
      Header: 'Роли',
      accessor: 'roles',
    },
  ], []);

  const moreOptions = [
    {
      title: 'Экспортировать таблицу',
      action: () => {
        const header = [
          'ФИО',
          'Дата рождения',
          'Вид документа',
          'Данные документа',
          'Факультет',
          'Форма обучения',
          'Курс',
          'Рейтинг',
          'Договор',
          'Телефон',
          'Почта',
          'Роли',
        ].join(',');

        const rows = users.map((user: any) => {
          const {
            fullName,
            birthDate,
            documentType,
            documentData,
            faculty,
            studyType,
            course,
            rating,
            contractNumber,
            phone,
            email,
            roles,
          } = user;

          return [
            fullName,
            birthDate,
            documentType,
            documentData,
            faculty,
            studyType,
            course,
            rating,
            contractNumber,
            phone,
            email,
            roles,
          ].join(',');
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + header + '\n' + rows.join('\n');
        const uri = encodeURI(csvContent)
        const link = document.createElement('a');
        link.setAttribute('href', uri);
        link.setAttribute('download', 'users.xlsx');
        document.body.appendChild(link);
        link.click();
      },
      isEnabled: () => users.length > 0,
    },
    {
      title: 'Добавить пользователя',
      action: () => setCreateDialogShown(true),
      isEnabled: () => true,
    },
    {
      title: 'Редактировать пользователя',
      action: () => {
        const { fullName, ...rest } = selectedRows[0];
        setEditUser({ ...rest, roles: rest.roles.split(' ') });
        setEditDialogShown(true);
      },
      isEnabled: () => selectedRows.length === 1,
    },
  ];

  const renderMore = () => (<Pane marginRight="15px"><More options={moreOptions} /></Pane>);

  const onPageClickClick = (page: number) => {
    getUsers(page);
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
          <Table columns={columns} data={users} onRowSelect={onRowSelect} />
        </Pane>

        <AddUser isShown={createDialogShown} setIsShown={setCreateDialogShown} onSubmit={submitCreateUser} />
        <EditUser isShown={editDialogShown} setIsShown={setEditDialogShown} onSubmit={submitEditUser} user={editUser} />
      </Pane>
    </Base>
  );
};

export default Users;
