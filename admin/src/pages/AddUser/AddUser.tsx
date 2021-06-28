import { useState, useEffect } from 'react';
import { Dialog, TextInputField, Pane, Checkbox, Button, Select, Label } from 'evergreen-ui';
import API from '../../lib/api';

type propTypes = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  onSubmit: (formData: formType) => void;
}

export type formType = {
  lastName: string;
  name: string;
  surname: string;
  birthDate: string;
  documentType: string;
  documentData: string;
  faculty: string;
  studyType: string;
  course: string;
  rating: string;
  contractNumber: string;
  phone: string;
  email: string;
  roles: string[];
}

type formErrorsType = {
  lastName: string;
  name: string;
  surname: string;
  birthDate: string;
  documentType: string;
  documentData: string;
  faculty: string;
  studyType: string;
  course: string;
  rating: string;
  contractNumber: string;
  phone: string;
  email: string;
  roles: string;
}

const AddUser = (props: propTypes) => {
  const { isShown, setIsShown, onSubmit } = props;

  const [formData, setFormData] = useState<formType>({
    lastName: '',
    name: '',
    surname: '',
    birthDate: '',
    documentType: 'паспорт',
    documentData: '',
    faculty: '',
    studyType: '',
    course: '',
    rating: '100',
    contractNumber: '',
    phone: '',
    email: '',
    roles: ['student'],
  });

  const [formErrors, setFormErrors] = useState<formErrorsType>({
    lastName: '',
    name: '',
    surname: '',
    birthDate: '',
    documentType: '',
    documentData: '',
    faculty: '',
    studyType: '',
    course: '',
    rating: '',
    contractNumber: '',
    phone: '',
    email: '',
    roles: '',
  });

  const verifyFields = () => {
    let e = {
      lastName: '',
      name: '',
      surname: '',
      birthDate: '',
      documentType: '',
      documentData: '',
      faculty: '',
      studyType: '',
      course: '',
      rating: '',
      contractNumber: '',
      phone: '',
      email: '',
      roles: '',
    };

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && !value.trim()) {
        e = { ...e, [key]: 'Заполните данное поле' };
      }
    });

    setFormErrors(e);

    return !Object.values(e).some(Boolean);
  };

  const close = () => {
    setIsShown(false);
    setFormData({
      lastName: '',
      name: '',
      surname: '',
      birthDate: '',
      documentType: 'паспорт',
      documentData: '',
      faculty: '',
      studyType: '',
      course: '',
      rating: '100',
      contractNumber: '',
      phone: '',
      email: '',
      roles: ['student'],
    });
    setFormErrors({
      lastName: '',
      name: '',
      surname: '',
      birthDate: '',
      documentType: '',
      documentData: '',
      faculty: '',
      studyType: '',
      course: '',
      rating: '',
      contractNumber: '',
      phone: '',
      email: '',
      roles: '',
    });
  }

  const submit = () => {
    if (verifyFields()) {
      setFormErrors({
        lastName: '',
        name: '',
        surname: '',
        birthDate: '',
        documentType: '',
        documentData: '',
        faculty: '',
        studyType: '',
        course: '',
        rating: '',
        contractNumber: '',
        phone: '',
        email: '',
        roles: '',
      });

      onSubmit(formData);
    }
  }

  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const getCourses = async () => {
    const token = localStorage.getItem('token') || '';
    const { courses } = await API.getCourses({ token, offset: 0, limit: 1000 });

    setCourses(courses);
  }

  const getFaculties = async () => {
    const token = localStorage.getItem('token') || '';
    const { faculties } = await API.getFaculties({ token, offset: 0, limit: 1000 });

    setFaculties(faculties);
  }

  useEffect(() => {
    getCourses();
    getFaculties();
  }, []);

  return (
    <Dialog
      isShown={isShown}
      title="Добавить пользователя"
      onCloseComplete={close}
      hasFooter={false}
    >
      <Pane display="flex" flexDirection="column">
        <TextInputField
          marginBottom="15px"
          label="Фамилия"
          name="lastName"
          validationMessage={formErrors['lastName'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Имя"
          name="name"
          validationMessage={formErrors['name'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Отчество"
          name="surname"
          validationMessage={formErrors['surname'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, surname: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Дата рождения"
          name="birthDate"
          validationMessage={formErrors['birthDate'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, birthDate: e.target.value })}
        />
        <Pane marginBottom="15px" width="100%">
          <Label>Вид документа</Label>
          <Select
            width="100%"
            marginTop="5px"
            value={formData.documentType}
            onChange={(e: any) => setFormData({ ...formData, documentType: e.target.value })}
          >
            <option value="паспорт">паспорт</option>
          </Select>
        </Pane>
        <TextInputField
          marginBottom="15px"
          label="Данные документа"
          name="documentData"
          validationMessage={formErrors['documentData'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, documentData: e.target.value })}
        />
        <Pane marginBottom="15px" width="100%">
          <Label>Факультет</Label>
          <Select
            width="100%"
            marginTop="5px"
            value={formData.faculty}
            onChange={(e: any) => setFormData({ ...formData, faculty: e.target.value })}
          >
            {faculties.map((faculty: any) => (
              <option value={faculty.title}>{faculty.title}</option>
            ))}
            
          </Select>
        </Pane>
        <Pane marginBottom="15px" width="100%">
          <Label>Форма обучения</Label>
          <Select
            width="100%"
            marginTop="5px"
            value={formData.studyType}
            onChange={(e: any) => setFormData({ ...formData, studyType: e.target.value })}
          >
            <option value="очная">очная</option>
            <option value="заочная">заочная</option>
          </Select>
        </Pane>
        <Pane marginBottom="15px" width="100%">
          <Label>Курс</Label>
          <Select
            width="100%"
            marginTop="5px"
            value={formData.course}
            onChange={(e: any) => setFormData({ ...formData, course: e.target.value })}
          >
            {courses.map((course: any) => (
              <option value={course.title}>{course.title}</option>
            ))}
            
          </Select>
        </Pane>
        <TextInputField
          marginBottom="15px"
          label="Рейтинг"
          type="number"
          name="rating"
          defaultValue="100"
          validationMessage={formErrors['rating'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, rating: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Номер договора"
          name="contractNumber"
          validationMessage={formErrors['contractNumber'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, contractNumber: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Телефон"
          name="phone"
          validationMessage={formErrors['phone'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Почта"
          name="email"
          type="email"
          validationMessage={formErrors['email'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
        />
        <Pane display="flex">
          <Checkbox
            marginRight="10px"
            label="Студент"
            checked={formData.roles && formData.roles.indexOf('student') !== -1}
            onChange={(e) => setFormData({ ...formData, roles: e.target.checked ? [...formData.roles, 'student'] : formData.roles.filter((role) => role !== 'student') })}
          />
          <Checkbox
            marginRight="10px"
            label="Комендант"
            checked={formData.roles && formData.roles.indexOf('comendant') !== -1}
            onChange={(e) => setFormData({ ...formData, roles: e.target.checked ? [...formData.roles, 'comendant'] : formData.roles.filter((role) => role !== 'comendant') })}
          />
          <Checkbox
            marginRight="10px"
            label="Деканат"
            checked={formData.roles && formData.roles.indexOf('dekanat') !== -1}
            onChange={(e) => setFormData({ ...formData, roles: e.target.checked ? [...formData.roles, 'dekanat'] : formData.roles.filter((role) => role !== 'dekanat') })}
          />
          <Checkbox
            label="Администратор"
            checked={formData.roles && formData.roles.indexOf('admin') !== -1}
            onChange={(e) => setFormData({ ...formData, roles: e.target.checked ? [...formData.roles, 'admin'] : formData.roles.filter((role) => role !== 'admin') })}
          />
        </Pane>
        <Button appearance="primary" alignSelf="flex-end" onClick={submit}>Создать</Button>
      </Pane>
    </Dialog>
  );
};

export default AddUser;
