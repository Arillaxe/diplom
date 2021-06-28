import { useState } from 'react';
import { Dialog, TextInputField, Pane, Button } from 'evergreen-ui';

type propTypes = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  onSubmit: (formData: formType) => void;
}

export type formType = {
  hostel: string;
  floor: number;
  room: number;
  place: number;
  userId?: number;
}

type formErrorsType = {
  hostel: string;
  floor: string;
  room: string;
  place: string;
}

const AddRoom = (props: propTypes) => {
  const { isShown, setIsShown, onSubmit } = props;

  const [formData, setFormData] = useState<formType>({
    hostel: '',
    floor: 0,
    room: 0,
    place: 0,
  });

  const [formErrors, setFormErrors] = useState<formErrorsType>({
    hostel: '',
    floor: '',
    room: '',
    place: '',
  });

  const verifyFields = () => {
    let e = {
      hostel: '',
      floor: '',
      room: '',
      place: '',
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
      hostel: '',
      floor: 0,
      room: 0,
      place: 0,
    });
    setFormErrors({
      hostel: '',
      floor: '',
      room: '',
      place: '',
    });
  }

  const submit = () => {
    if (verifyFields()) {
      setFormErrors({
        hostel: '',
        floor: '',
        room: '',
        place: '',
      });

      onSubmit(formData);
    }
  }

  return (
    <Dialog
      isShown={isShown}
      title="Добавить комнату"
      onCloseComplete={close}
      hasFooter={false}
    >
      <Pane display="flex" flexDirection="column">
        <TextInputField
          marginBottom="15px"
          label="Общежитие"
          name="hostel"
          validationMessage={formErrors['hostel'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hostel: e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Этаж"
          name="floor"
          type="number"
          validationMessage={formErrors['floor'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, floor: +e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Комната"
          name="room"
          type="number"
          validationMessage={formErrors['room'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, room: +e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="Место"
          name="place"
          type="number"
          validationMessage={formErrors['place'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, place: +e.target.value })}
        />
        <TextInputField
          marginBottom="15px"
          label="ID пользователя"
          name="userId"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, userId: +e.target.value })}
        />
        <Button appearance="primary" alignSelf="flex-end" onClick={submit}>Создать</Button>
      </Pane>
    </Dialog>
  );
};

export default AddRoom;
