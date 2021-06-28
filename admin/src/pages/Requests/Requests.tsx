import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Pane } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { Base } from '..';
import { Table, More, Pagination } from '../../components';
import API from '../../lib/api';

moment.locale('ru');

const STATUS_MAP = {
  'DEKANAT_VERIFY': { title: 'На рассмотрении деканатом', color: 'blue' },
  'ADMIN_VERIFY': { title: 'На рассмотрении администратором', color: 'blue' },
  'APPROVED': { title: 'Одобрена', color: 'green' },
  'REJECTED': { title: 'Отклонена', color: 'red' },
}

const Requests = () => {
  const user = useSelector(({ app }: any) => app.user);

  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(50);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const getRequests = async (page: number) => {
    const token = localStorage.getItem('token') || '';
    const { requests, total } = await API.getRequests({ token, offset: (page - 1) * 50, limit: 50 });

    setTotal(total);
    setRequests(requests.map((request: { status: 'DEKANAT_VERIFY' | 'ADMIN_VERIFY' | 'APPROVED' | 'REJECTED' }) => ({ ...request, status2: STATUS_MAP[request.status].title })));
  };

  useEffect(() => {
    getRequests(1);
  }, []);

  const approveRequest = async () => {
    const token = localStorage.getItem('token') || '';
    const { roles } = user;
    const { status, id } = selectedRows[0];

    let newStatus = '';

    if (status === 'DEKANAT_VERIFY' && roles.includes('admin') || status === 'ADMIN_VERIFY') {
      newStatus = 'APPROVED';
    } else if (status === 'DEKANAT_VERIFY' && roles.includes('dekanat')) {
      newStatus = 'ADMIN_VERIFY';
    }

    await API.updateRequestStatus({ token, id, status: newStatus });
    await getRequests(1);

    NotificationManager.success('Заявка одобрена');
  };

  const rejectRequest = async () => {
    const token = localStorage.getItem('token') || '';
    const { id } = selectedRows[0];

    await API.updateRequestStatus({ token, id, status: 'REJECTED' });
    await getRequests(1);

    NotificationManager.success('Заявка отклонена');
  };

  const columns = useMemo(() =>[
    {
      Header: 'ФИО',
      accessor: 'fullName',
    },
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
      Header: 'Статус',
      accessor: 'status2',
    },
  ], []);

  const approveEnabled = () => {
    if (!(selectedRows.length === 1)) return false;
    const { roles } = user;
    const { status } = selectedRows[0];

    if (status === 'DEKANAT_VERIFY' && roles.includes('dekanat')) return true;
    if (status === 'ADMIN_VERIFY' && roles.includes('admin')) return true;

    return false;
  }

  const moreOptions = [
    {
      title: 'Одобрить',
      action: () => approveRequest(),
      isEnabled: approveEnabled,
    },
    {
      title: 'Отклонить',
      action: () => rejectRequest(),
      isEnabled: () => selectedRows.length === 1 && selectedRows[0].status !== 'REJECTED',
    },
  ];

  const renderMore = () => (<Pane marginRight="15px"><More options={moreOptions} /></Pane>);

  const onPageClickClick = (page: number) => {
    getRequests(page);
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
          <Table columns={columns} data={requests} onRowSelect={onRowSelect} />
        </Pane>
      </Pane>
    </Base>
  );
};

export default Requests;
