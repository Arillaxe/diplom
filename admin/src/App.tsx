import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Redirecter from './lib/Redirecter';
import store from './lib/store';
import { Login, Users, Rooms, Courses, Faculties, Requests } from './pages';
import 'react-notifications/lib/notifications.css';

import CheckAuth from './lib/CheckAuth';

function App () {
  return (
    <Provider store={store}>
      <CheckAuth />
      <Router>
        <Route exact path="/"><Redirecter /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/users"><Users /></Route>
        <Route path="/rooms"><Rooms /></Route>
        <Route path="/courses"><Courses /></Route>
        <Route path="/faculties"><Faculties /></Route>
        <Route path="/requests"><Requests /></Route>
      </Router>
      <NotificationContainer />
    </Provider>
  );
}

export default App;
