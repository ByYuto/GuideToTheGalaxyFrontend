import axios from 'axios';
import { store } from '../redux/store';
import { setAuthorization } from '../redux/reducers/authState';
import { updateToast } from '../redux/reducers/appState';
import history from '../router/history';

const instance = axios.create();

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      store.dispatch(setAuthorization(false));
      history.push('/');
      store.dispatch(updateToast(true, 'Session expired', 'error'));
    }
    if (error?.response?.status === 500) {
      store.dispatch(updateToast(true, 'Unexpected error from server', 'error'));
    }
    throw error;
  }
);

export default instance;
