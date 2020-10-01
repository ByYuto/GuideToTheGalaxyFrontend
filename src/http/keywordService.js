import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const KEYWORDS_ROUTE = api + '/keywords';
const KEYWORDS_SEARCHBAR = api + '/keywords/suggested/search';

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

export const getKeywordsSuggestions = async (categoryId, placeId) => {
  let params = '';
  if (categoryId.length > 0) {
    params += `?categoryId=${categoryId}`;
  }
  if (placeId.length > 0 && categoryId.length > 0) {
    params += `&placeId=${placeId}`;
  } else if (placeId.length > 0 && categoryId.length === 0) {
    params += `?placeId=${placeId}`;
  }
  return axios.get(KEYWORDS_SEARCHBAR + params);
};
