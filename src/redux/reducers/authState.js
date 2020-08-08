import { USER_LOGIN } from '../actions/authActions';

const initialState = {
  user: null,
  authenticated: false,
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return { ...state, user: payload.user, authenticated: payload.authenticated };
    default:
      return state;
  }
};
