import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Redirecter from './lib/Redirecter';
import store from './lib/store';
import { Login, Users, Rooms, Courses, Faculties } from './pages';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/"><Redirecter /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/users"><Users /></Route>
        <Route path="/rooms"><Rooms /></Route>
        <Route path="/courses"><Courses /></Route>
        <Route path="/faculties"><Faculties /></Route>
      </Router>
      <NotificationContainer />
    </Provider>
  );
}

export default App;
