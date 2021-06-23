import { useSelector } from 'react-redux';
import { Switch, Route , useHistory, Link } from 'react-router-dom';
import { Pane, Button } from 'evergreen-ui';
import { Users, Rooms } from '..';

const Home = () => {
  return (
    <Pane>
      <Pane background="#101840" display="flex" justifyContent="center">
        <Pane width="900px" paddingTop="15px" paddingBottom="15px" display="flex">
          <Link to="/users">
            <Button appearance="minimal" color="#e1e1e1 !important" fontSize="16px" marginRight="10px">Пользователи</Button>
          </Link>
          <Link to="/rooms">
            <Button appearance="minimal" color="#e1e1e1 !important" fontSize="16px" marginRight="10px">Комнаты</Button>
          </Link>
          <Button appearance="minimal" color="#e1e1e1 !important" fontSize="16px" marginLeft="auto">Выйти</Button>
        </Pane>
      </Pane>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/rooms">
          <Rooms />
        </Route>
      </Switch>
    </Pane>
  );
};

export default Home;
