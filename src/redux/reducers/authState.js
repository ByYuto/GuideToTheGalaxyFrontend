import { USER_LOGIN } from '../actions/authActions';

const initialState = {
  user: null,
  authorization: false,
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
