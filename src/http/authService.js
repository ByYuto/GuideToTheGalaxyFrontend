import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const loginRoute = api + '/login';
const loginFbRoute = api + '/login/facebook';
const loginGoogleRoute = api + '/login/google';

export const login = (loginData) => {
  return axios.post(loginRoute, loginData);
};

export const facebookLogin = (loginData) => {
  return axios.post(loginFbRoute, loginData);
}
export const googleLogin = (loginData) => {
  return axios.post(loginGoogleRoute, loginData);
}