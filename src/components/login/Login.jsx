import React, { useState } from 'react';
import { LoginLayout } from './styledComponent';
import Button from '../UI/Button';
import GoogleLogo from '../../assets/icons/Google.svg';
import FacebookLogo from '../../assets/icons/FB.svg';
import Divider from '../UI/Divider';
import Input from '../UI/forms/Input';
import { ThemeProvider } from 'styled-components';
import { FlexContainer } from '../UI/Helpers';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isRequired, validate, validateEmail } from '../../utils/validations';
import { loginAction, facebookLoginAction, googleLoginAction } from '../../redux/actions/authActions';
import Loader from '../UI/Loader';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import RegisterForm from './RegisterForm';
import { MdClose } from 'react-icons/md';
import Config from '../../lib/Config';

const GOOGLE_CLIENT_KEY = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
const FACEBOOK_CLIENT_KEY = process.env.REACT_APP_FACEBOOK_CLIENT_KEY;

export default function Login({ handleCancel }) {
  const [form, setFormState] = useState({ valid: false, loading: false, error: false, errorType: '', submit: false });
  const [email, setEmail] = useState({ value: '', valid: false, errorType: '' });
  const [password, setPassword] = useState({ value: '', valid: false, errorType: '' });
  const [displayRegister, setDisplayRegister] = useState(false);
  const dispatch = useDispatch();
  const { error, errorMessage, loading } = useSelector((store) => store.auth);
  const handleEmailChange = (value) => {
    const validation = validate(value, [isRequired, validateEmail]);
    if (validation.length > 0) {
      const error = validation[0];
      setEmail({ ...email, value: value, valid: error.valid, errorType: error.errorType });
    } else {
      setEmail({ ...email, value: value, valid: true, errorType: '' });
    }
  };
  const handlePasswordChange = (value) => {
    const validation = validate(value, [isRequired]);
    if (validation.length > 0) {
      const error = validation[0];
      setPassword({ ...password, value: value, valid: error.valid, errorType: error.errorType });
    } else {
      setPassword({ ...password, value: value, valid: true, errorType: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ ...form, submit: true });
    handleEmailChange(e.target.elements[0].value);
    handlePasswordChange(e.target.elements[1].value);
    if (email.valid && password.valid) {
      setFormState({ ...form, valid: true, loading: true });
      dispatch(loginAction({ email: email.value, password: password.value }));
    }
  };

  const responseGoogle = (response) => {
    if (response && response.accessToken) {
      dispatch(googleLoginAction(response.accessToken));
    }
  };

  const responseFacebook = (response) => {
    if (response && response.accessToken) {
      dispatch(facebookLoginAction(response.accessToken));
    }
  };

  return (
    <ThemeProvider theme={{ isDark: true }}>
      <div className="modal-header">
        <h4>{displayRegister ? 'Sign up' : 'Log in'}</h4>
        <MdClose size={24} onClick={handleCancel} />
      </div>
      <LoginLayout>
        {!Config.HIDE_WHILE_LAUNCH ? (
          <>
            <div>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_KEY}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <Button onClick={renderProps.onClick} span="24px" darker elmWidth="232px" elmHeight="40px">
                    <img src={GoogleLogo} alt="Sign up with google" />
                    {displayRegister ? 'Sign up' : 'Log in'} with Google
                  </Button>
                )}
              />
            </div>

            <div>
              <FacebookLogin
                appId={FACEBOOK_CLIENT_KEY}
                fields="name,email,picture"
                render={(renderProps) => (
                  <Button onClick={renderProps.onClick} span="24px" darker elmWidth="232px" elmHeight="40px">
                    <img src={FacebookLogo} alt="Sign up with Facebook" />
                    {displayRegister ? 'Sign up' : 'Log in'} with Facebook
                  </Button>
                )}
                callback={responseFacebook}
              />
            </div>
            <Divider />
          </>
        ) : null}
        {!displayRegister ? (
          <FlexContainer className="form-container" direction="column" align="center" justify="space-between" span="0">
            <p className="form-title">{displayRegister ? 'Sign up' : 'Log in'} with an email</p>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <FlexContainer className="form-inside" direction="column" justify="space-evenly">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email.value}
                    handleChange={(e) => handleEmailChange(e.target.value)}
                    valid={email.valid}
                    errorMessage={email.errorType}
                    isSubmitted={form.submit}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password.value}
                    handleChange={(e) => handlePasswordChange(e.target.value)}
                    noMargin
                    valid={password.valid}
                    errorMessage={password.errorType}
                    isSubmitted={form.submit}
                  />
                </div>
                {!Config.HIDE_WHILE_LAUNCH ? (
                  <div style={{ width: '100%' }}>
                    <p>
                      Forgot your password? <Link to="/forget-password">Recover it</Link>
                    </p>
                  </div>
                ) : null}
              </FlexContainer>
              {!loading ? (
                <FlexContainer span="0" padding="0" justify="center">
                  <Button span="24px" onClick={handleCancel} rounded modalSecondary>
                    Cancel
                  </Button>
                  <Button span="24px" type="submit" rounded>
                    Log in
                  </Button>
                </FlexContainer>
              ) : (
                <FlexContainer justify="center" align="center">
                  <Loader />
                </FlexContainer>
              )}
              {error && <div className="error-message">{errorMessage}</div>}
            </form>
            {!Config.HIDE_WHILE_LAUNCH ? (
              <>
                <Divider />
                <div style={{ textAlign: 'center' }}>
                  <p>
                    Don’t have an account yet?{' '}
                    <button className="btn-like-link" onClick={(e) => setDisplayRegister(true)}>
                      SIGN UP
                    </button>
                  </p>
                </div>
              </>
            ) : null}
          </FlexContainer>
        ) : (
          <RegisterForm setDisplayRegister={setDisplayRegister} />
        )}
      </LoginLayout>
    </ThemeProvider>
  );
}
