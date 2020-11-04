import { login, facebookLogin, googleLogin, registerUser  } from '../../http/authService';
export const USER_LOGIN = 'USER_LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN';
export const USER_REGISTRATION = 'USER_REGISTRATION';


export const loginAction = (user) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: {
      loading: true,
      error: false,
    },
  });
  try {
    const token = await login(user);
    window.localStorage.setItem('_token', token.data.token);
    dispatch({
      type: USER_LOGIN,
      payload: {
        user: user.email,
        authorization: true,
        loading: false,
      },
    });
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message;
    dispatch({
      type: USER_LOGIN,
      payload: {
        error: true,
        errorMessage: errorMessage,
        loading: false,
      },
    });
  }
};
export const facebookLoginAction = (token) => async (dispatch) => {
  dispatch({
    type: FACEBOOK_LOGIN,
    payload: {
      loading: true,
      error: false,
    },
  });
  try {
    const response = await facebookLogin({accessToken: token});
    window.localStorage.setItem('_token', response.data.token);
    dispatch({
      type: FACEBOOK_LOGIN,
      payload: {
        authorization: true,
        loading: false,
      },
    });
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message;
    dispatch({
      type: FACEBOOK_LOGIN,
      payload: {
        error: true,
        errorMessage: errorMessage,
        loading: false,
      },
    });
  }
};
export const googleLoginAction = (token) => async (dispatch) => {
  dispatch({
    type: FACEBOOK_LOGIN,
    payload: {
      loading: true,
      error: false,
    },
  });
  try {
    const response = await googleLogin({accessToken: token});
    window.localStorage.setItem('_token', response.data.token);
    dispatch({
      type: FACEBOOK_LOGIN,
      payload: {
        authorization: true,
        loading: false,
      },
    });
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message;
    dispatch({
      type: FACEBOOK_LOGIN,
      payload: {
        error: true,
        errorMessage: errorMessage,
        loading: false,
      },
    });
  }
};
export const registerUserAction = (userData) => async (dispatch) => {
  dispatch({
    type: USER_REGISTRATION,
    payload: {
      loading: true,
      error: false,
    },
  });
  try {
    const response = await registerUser(userData);
    window.localStorage.setItem('_token', response.data.token);
    dispatch({
      type: USER_REGISTRATION,
      payload: {
        authorization: true,
        loading: false,
      },
    });
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message;
    dispatch({
      type: USER_REGISTRATION,
      payload: {
        error: true,
        errorMessage: errorMessage,
        loading: false,
      },
    });
  }
};

export const checkLogin = () => (dispatch) => {
  const token = window.localStorage.getItem('_token');
  const auth = token !== null;
  dispatch({ type: CHECK_LOGIN, payload: { authorization: auth } });
};
