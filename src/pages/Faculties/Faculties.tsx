import { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { Pane, Button, EditIcon, IconButton, TrashIcon, CameraIcon } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { AddFaculty, EditFaculty, Base } from '..';
import { Table, More, Pagination } from '../../components';
import API from '../../lib/api';
import { formType } from '../AddFaculty/AddFaculty';

moment.locale('ru');

const Courses = () => {
  const [faculties, setCourses] = useState([]);
  const [total, setTotal] = useState(50);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [createDialogShown, setCreateDialogShown] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [editCourse, setEditCourse] = useState<formType>({
    title: '',
  });

  const getCourses = async (page: number) => {
    const token = localStorage.getItem('token') || '';
    const { faculties, total } = await API.getFaculties({ token, offset: (page - 1) * 50, limit: 50 });

    setTotal(total);
    setCourses(faculties);
  };

  useEffect(() => {
    getCourses(1);
  }, []);

  const submitCreateCourse = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.createFaculty({ token, formData });

      NotificationManager.success('Факультет создан');

      setCreateDialogShown(false);
      getCourses(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const submitEditCourse = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.updateFaculty({ token, formData });

      NotificationManager.success('Факультет обновлен');

      setEditDialogShown(false);
      getCourses(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  }

  const deleteCourse = async (courseId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.deleteFaculty({ token, courseId });

      NotificationManager.success('Факултет удален');

      getCourses(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const columns = useMemo(() =>[
    {
      Header: 'Название',
      accessor: 'title',
    },
  ], []);

  const moreOptions = [
    {
      title: 'Добавить факультет',
      action: () => setCreateDialogShown(true),
      isEnabled: () => true,
    },
    {
      title: 'Редактировать факультет',
      action: () => {
        setEditCourse(selectedRows[0]);
        setEditDialogShown(true);
      },
      isEnabled: () => selectedRows.length === 1,
    },
    {
      title: 'Удалить факультет',
      action: () => {
        deleteCourse(selectedRows[0].id);
      },
      isEnabled: () => selectedRows.length === 1,
    },
  ];

  const renderMore = () => (<Pane marginRight="15px"><More options={moreOptions} /></Pane>);

  const onPageClickClick = (page: number) => {
    getCourses(page);
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
          <Table columns={columns} data={faculties} onRowSelect={onRowSelect} />
        </Pane>

        <AddFaculty isShown={createDialogShown} setIsShown={setCreateDialogShown} onSubmit={submitCreateCourse} />
        <EditFaculty isShown={editDialogShown} setIsShown={setEditDialogShown} onSubmit={submitEditCourse} course={editCourse} />
      </Pane>
    </Base>
  );
};

export default Courses;
