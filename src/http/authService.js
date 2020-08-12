import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const loginRoute = api + '/login';

export const login = (loginData) => {
  return axios.post(loginRoute, loginData);
};
