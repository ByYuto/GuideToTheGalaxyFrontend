import { USER_LOGIN } from '../actions/authActions';

const SET_AUTHORIZATION = 'SET_AUTHORIZATION';

const token = window.localStorage.getItem('_token');
const auth = token !== null;
const initialState = {
  user: null,
  authorization: auth,
  loading: false,
  error: false,
  errorMessage: '',
};

export const setAuthorization = (authorization) => {
  if (!authorization) {
    localStorage.removeItem('_token');
  }
  return { type: SET_AUTHORIZATION, payload: authorization };
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return { ...state, ...payload };
    case SET_AUTHORIZATION:
      return {
        ...state,
        authorization: payload,
      };
    default:
      return state;
  }
};
