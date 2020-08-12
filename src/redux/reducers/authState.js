import { USER_LOGIN } from '../actions/authActions';

const token = window.localStorage.getItem('_token');
const auth = token !== null;
const initialState = {
  user: null,
  authorization: auth,
  loading: false,
  error: false,
  errorMessage: '',
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return { ...state, ...payload };
    default:
      return state;
  }
};
