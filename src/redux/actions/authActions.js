import { login } from '../../http/authService';
export const USER_LOGIN = 'USER_LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';

export const loginAction = (user) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: {
      loading: true,
    },
  });
  try {
    const token = await login(user);
    window.localStorage.setItem('_token', token);
    dispatch({
      type: USER_LOGIN,
      payload: {
        user: user.email,
        authorization: true,
        loading: false,
      },
    });
  } catch (e) {
    dispatch({
      type: USER_LOGIN,
      payload: {
        error: true,
        errorMessage: e.message,
        loading: false,
      },
    });
  }
};

export const checkLogin = () => (dispatch) => {
  const token = window.localStorage.setItem('_token', token);
  debugger;
  const auth = token !== null;
  dispatch({ type: CHECK_LOGIN, payload: { authorization: auth } });
};
