import { Link } from 'react-router-dom';
import { Pane, Button, Select } from 'evergreen-ui';

const Header  = () => {

  return (
    <Pane background="#101840" display="flex" justifyContent="center">
      <Pane width="900px" paddingTop="15px" paddingBottom="15px" display="flex">
        <Select>
          <option>Пользователи</option>
          <option>Комнаты</option>
          <option>Курсы</option>
          <option>Факультеты</option>
          <option>Заявки на поселение</option>
        </Select>
        {/* <Link to="/users">
          <Button appearance="minimal" color="#e1e1e1 !important" fontSize="16px" marginRight="10px">Пользователи</Button>
        </Link>
        <Link to="/rooms">
          <Button appearance="minimal" color="#e1e1e1 !important" fontSize="16px" marginRight="10px">Комнаты</Button>
        </Link>
        <Button appearance="minimal" color="#e1e1e1 !important" fontSize="16px" marginLeft="auto">Выйти</Button> */}
      </Pane>
    </Pane>
  );
};

export default Header;
