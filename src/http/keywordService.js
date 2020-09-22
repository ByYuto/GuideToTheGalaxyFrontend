import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const KEYWORDS_ROUTE = api + '/keywords';

//To match suggestions based on a search when I'm creating a post
export const findKeywords = async (word) => {
  const token = await localStorage.getItem('_token');
  return axios.get(KEYWORDS_ROUTE + `?text=${word}`, { headers: { Authorization: `Bearer ${token}` } });
};

//To place recommendations based on category and content type selected when I'm creating a post.
export const getRecommendedKeywordsService = async (categoryId, contentId) => {
  const token = await localStorage.getItem('_token');
  return axios.get(KEYWORDS_ROUTE + `/suggested?categoryId=${categoryId}&contentTypeId=${contentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
