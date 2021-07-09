import axios from './interceptor';

const api = process.env.REACT_APP_API_URL;
const loadImageRoute = api + '/images';
const ADD_FILE = api + '/files';
const CREATE_ARTICLE = api + '/articles';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const dataImage = await uploadImageRequest(formData);
    return { url: dataImage.data.content, imageId: dataImage.data._id };
  } catch (e) {
    console.log(e.response || e.message);
    throw e;
  }
};

export const uploadImageRequest = async (formData) => {
  const token = await localStorage.getItem('_token');
  return axios.post(loadImageRoute, formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadFile = async (file, cancelToken = undefined) => {
  const formData = new FormData();
  formData.append('file', file);
  const dataImage = await uploadFileRequest(formData, cancelToken);
  return { url: dataImage.data.url, fileId: dataImage.data._id };
};

export const uploadFileRequest = async (formData, cancelToken) => {
  const token = await localStorage.getItem('_token');
  return axios.post(ADD_FILE, formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    cancelToken,
  });
};

export const createArticleRequest = async (data) => {
  const token = await localStorage.getItem('_token');
  return axios.post(CREATE_ARTICLE, data, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
};

export const createArticle = async (article) => {
  try {
    const response = await createArticleRequest(article);
    return response;
  } catch (e) {
    if (e.data) {
      return { status: e.status, message: e.data.error || e.message };
    } else {
      return { status: 500, message: 'Unexpected error' };
    }
  }
};
