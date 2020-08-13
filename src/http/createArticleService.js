import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const loadImageRoute = api + '/image';

export const uploadImage = async (formData) => {
  const token = await localStorage.getItem('_token');
  return axios.post(loadImageRoute, formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
};
