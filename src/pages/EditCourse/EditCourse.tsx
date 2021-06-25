import { useState } from 'react';
import { Dialog, TextInputField, Pane, Button } from 'evergreen-ui';

type propTypes = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  onSubmit: (formData: formType) => void;
  course: formType;
}

export type formType = {
  title: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type formErrorsType = {
  title: string;
}

const EditCourse = (props: propTypes) => {
  const { isShown, setIsShown, onSubmit, course: { createdAt, updatedAt, ...rest } } = props;

  const [formData, setFormData] = useState<formType>(rest);

  const [formErrors, setFormErrors] = useState<formErrorsType>({
    title: '',
  });

  const verifyFields = () => {
    let e = {
      title: '',
    };

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && !value.trim()) {
        e = { ...e, [key]: 'Заполните данное поле' };
      }
    });

    setFormErrors(e);

    return !Object.values(e).some(Boolean);
  };

  const open = () => {
    setFormData(rest);
  }

  const close = () => {
    setIsShown(false);
    setFormErrors({
      title: '',
    });
  }

  const submit = () => {
    if (verifyFields()) {
      setFormErrors({
        title: '',
      });

      onSubmit(formData);
    }
  }

  return (
    <Dialog
      isShown={isShown}
      title="Редактировать курс"
      onCloseComplete={close}
      onOpenComplete={open}
      hasFooter={false}
    >
      <Pane display="flex" flexDirection="column">
        <TextInputField
          marginBottom="15px"
          label="Название"
          name="title"
          value={formData.title}
          validationMessage={formErrors['title'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
        />
        <Button appearance="primary" alignSelf="flex-end" onClick={submit}>Сохранить</Button>
      </Pane>
    </Dialog>
  );
};

export default EditCourse;
