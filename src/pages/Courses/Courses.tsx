import { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { Pane, Button, EditIcon, IconButton, TrashIcon, CameraIcon } from 'evergreen-ui';
import { NotificationManager } from 'react-notifications';
import { AddCourse, EditCourse, Base } from '..';
import { Table, More, Pagination } from '../../components';
import API from '../../lib/api';
import { formType } from '../AddCourse/AddCourse';

moment.locale('ru');

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(50);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [createDialogShown, setCreateDialogShown] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [editCourse, setEditCourse] = useState<formType>({
    title: '',
  });

  const getCourses = async (page: number) => {
    const token = localStorage.getItem('token') || '';
    const { courses, total } = await API.getCourses({ token, offset: (page - 1) * 50, limit: 50 });

    setTotal(total);
    setCourses(courses);
  };

  useEffect(() => {
    getCourses(1);
  }, []);

  const submitCreateCourse = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.createCourse({ token, formData });

      NotificationManager.success('Курс создан');

      setCreateDialogShown(false);
      getCourses(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const submitEditCourse = async (formData: formType) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.updateCourse({ token, formData });

      NotificationManager.success('Курс обновлен');

      setEditDialogShown(false);
      getCourses(1);
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  }

  const deleteCourse = async (courseId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      await API.deleteCourse({ token, courseId });

      NotificationManager.success('Курс удален');

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
      title: 'Добавить курс',
      action: () => setCreateDialogShown(true),
      isEnabled: () => true,
    },
    {
      title: 'Редактировать курс',
      action: () => {
        setEditCourse(selectedRows[0]);
        setEditDialogShown(true);
      },
      isEnabled: () => selectedRows.length === 1,
    },
    {
      title: 'Удалить курс',
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
          <Table columns={columns} data={courses} onRowSelect={onRowSelect} />
        </Pane>

        <AddCourse isShown={createDialogShown} setIsShown={setCreateDialogShown} onSubmit={submitCreateCourse} />
        <EditCourse isShown={editDialogShown} setIsShown={setEditDialogShown} onSubmit={submitEditCourse} course={editCourse} />
      </Pane>
    </Base>
  );
};

export default Courses;
