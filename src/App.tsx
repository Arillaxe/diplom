import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import CheckAuth from './lib/CheckAuth';
import RoleRedirecter from './lib/RoleRedirecter';
import store from './lib/store';
import { Login, Home } from './pages';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CheckAuth />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <RoleRedirecter />
            <Switch>
              <Route path="/users"><Home /></Route>
              <Route path="/rooms"><Home /></Route>
            </Switch>
          </Route>
        </Switch>
      </Router>
      <NotificationContainer />
    </Provider>
  );
}

export default App;
