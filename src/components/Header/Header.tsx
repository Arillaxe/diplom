import { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Pane, Select, LogOutIcon } from 'evergreen-ui';

import './styles.css';

const Header = (props: any) => {
  const { renderMore, renderPagination } = props;
  const history = useHistory();
  const currentPage = history.location.pathname.slice(1);

  const updateCurrentPage = (page: string) => {
    history.push(`/${page}`);
  }

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Pane display="flex" justifyContent="space-between" padding="15px" className="header" marginTop="-71px" boxShadow="0 1px 3px 0 rgb(0 0 0 / 20%)">
      <Select
        height={41}
        boxShadow="0 1px 3px 0 rgb(0 0 0 / 20%)"
        maxWidth={240}
        value={currentPage}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateCurrentPage(e.target.value)}
        alignSelf="flex-start"
      >
        <option value="users">Пользователи</option>
        <option value="rooms">Комнаты</option>
        <option value="courses">Курсы</option>
        <option value="faculties">Факультеты</option>
        <option value="requests">Заявки на поселение</option>
      </Select>
      {renderPagination && renderPagination()}
      {renderMore && renderMore()}
      <div className="logout" onClick={logOut}>Выйти <LogOutIcon marginLeft="10px" /></div>
    </Pane>
  );
};

export default Header;
