import { useState } from 'react';
import { Dialog, TextInputField, Pane, Button } from 'evergreen-ui';

type propTypes = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  onSubmit: (formData: formType) => void;
}

export type formType = {
  title: string;
}

type formErrorsType = {
  title: string;
}

const AddCourse = (props: propTypes) => {
  const { isShown, setIsShown, onSubmit } = props;

  const [formData, setFormData] = useState<formType>({
    title: '',
  });

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

  const close = () => {
    setIsShown(false);
    setFormData({
      title: '',
    });
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
      title="Добавить курс"
      onCloseComplete={close}
      hasFooter={false}
    >
      <Pane display="flex" flexDirection="column">
        <TextInputField
          marginBottom="15px"
          label="Название"
          name="title"
          validationMessage={formErrors['title'] || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
        />
        <Button appearance="primary" alignSelf="flex-end" onClick={submit}>Создать</Button>
      </Pane>
    </Dialog>
  );
};

export default AddCourse;
