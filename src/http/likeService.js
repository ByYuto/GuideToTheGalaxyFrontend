import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const LIKES_ROUTE = api + '/likes';

//To set a like in a specific post triggered by specific user.
export const setLikeService = async (articleId) => {
  const token = await localStorage.getItem('_token');
  return axios.post(
    `${LIKES_ROUTE}`,
    {articleId},
    {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    }
  );
};

//To unset a like in a specific post triggered by specific user.
export const unsetLikeService = async (articleId) => {
  const token = await localStorage.getItem('_token');
  return axios.post(
    `${LIKES_ROUTE}`,
    {articleId},
    {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    }
  );
};
