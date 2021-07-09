import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const ME_CONTRIBUTIONS_ROUTE = api + '/me/contributions';

//To set a like in a specific post triggered by specific user.
export const getMeContributionsService = async (lastItem) => {
  const token = await localStorage.getItem('_token');
  return axios.get(`${ME_CONTRIBUTIONS_ROUTE}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      after: lastItem || undefined,
      limit: 20,
    },
  });
};
