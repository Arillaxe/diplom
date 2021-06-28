import { useEffect } from 'react';
import { useDispatch, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import store from './lib/store';
import api from './lib/api';
import { Redirecter } from './lib/Redirecter';
import { Login, Profile, Requests } from './pages';
import appSlice from './app.slice';

const App = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = await api.getUser({ token });
      dispatch(appSlice.actions.setUser(user));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Route exact path="/"><Redirecter /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/requests"><Requests /></Route>
      </Router>
      <NotificationContainer />
    </ChakraProvider>
  );
};

const AppProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppProvider;
