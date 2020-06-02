import axios from 'axios';
import Config from './Config';

const API = axios.create({
  baseURL: Config.API_URL,
});

API.getCategories = () => {
  return API.get('/categories');
};

export default API;
