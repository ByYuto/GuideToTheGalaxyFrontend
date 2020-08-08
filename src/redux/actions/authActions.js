import { login } from '../../http/authService';
export const USER_LOGIN = 'USER_LOGIN';

export const loginAction = (user) => async (dispatch) => {
  try {
    const token = await login(user);
    window.localStorage.setItem('_token', token);
    dispatch({
      type: USER_LOGIN,
      payload: {
        user: user.email,
        authenticated: true,
      },
    });
  } catch (e) {}
};
