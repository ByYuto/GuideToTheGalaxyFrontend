import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const loadImageRoute = api + '/image';


export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const dataImage = await uploadImageRequest(formData);
    return {url: dataImage.data.url};
  } catch (e) {
    console.log(e.response || e.message);
    return e;
  }
};

export const uploadImageRequest = async (formData) => {
  const token = await localStorage.getItem('_token');
  return axios.post(loadImageRoute, formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
};
