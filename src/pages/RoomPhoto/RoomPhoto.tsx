import { useState } from 'react';
import { Dialog, TextInputField, Pane, Checkbox, Button } from 'evergreen-ui';

type propTypes = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  onSubmit: () => void;
}

const RoomPhoto = (props: propTypes) => {
  const { isShown, setIsShown, onSubmit } = props;

  const close = () => {
    setIsShown(false);
  }

  const submit = () => {
    onSubmit();
  }

  return (
    <Dialog
      isShown={isShown}
      title="Фотографии"
      onCloseComplete={close}
      hasFooter={false}
    >
      <Pane display="flex" flexDirection="column">
        
        <Button appearance="primary" alignSelf="flex-end" onClick={submit}>Добавить фотографию</Button>
      </Pane>
    </Dialog>
  );
};

export default RoomPhoto;
