import { useState } from 'react';
import { Dialog, TextInputField, Pane, Checkbox, Button } from 'evergreen-ui';

type propTypes = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  onSubmit: (formData: formType) => void;
}

export type formType = {
  lastName: string;
  name: string;
  surname: string;
  contractNumber: string;
  phone: string;
  email: string;
  roles: string[];
}

type formErrorsType = {
  lastName: string;
  name: string;
  surname: string;
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
    contractNumber: '',
    phone: '',
    email: '',
    roles: ['student'],
  });

  const [formErrors, setFormErrors] = useState<formErrorsType>({
    lastName: '',
    name: '',
    surname: '',
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
      contractNumber: '',
      phone: '',
      email: '',
      roles: ['student'],
    });
    setFormErrors({
      lastName: '',
      name: '',
      surname: '',
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
        contractNumber: '',
        phone: '',
        email: '',
        roles: '',
      });

      onSubmit(formData);
    }
  }

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
