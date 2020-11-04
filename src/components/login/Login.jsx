import React, { useState, useRef } from 'react';
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
      //setFormState({ ...form, valid: true, loading: false });
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
      <LoginLayout>
        <div>
          <GoogleLogin
            clientId="643337274039-1mc3ifs771s0r39l4tmj7d3719aj79l9.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <Button onClick={renderProps.onClick} span="24px" darker elmWidth="232px" elmHeight="40px">
                <img src={GoogleLogo} />
                Sign up with Google
              </Button>
            )}
          />
        </div>

        <div>
          <FacebookLogin
            appId="646987882647026"
            fields="name,email,picture"
            render={(renderProps) => (
              <Button onClick={renderProps.onClick} span="24px" darker elmWidth="232px" elmHeight="40px">
                <img src={FacebookLogo} />
                Sign up with Facebook
              </Button>
            )}
            callback={responseFacebook}
          />
        </div>
        <Divider />
        {!displayRegister ? (
          <FlexContainer className="form-container" direction="column" align="center" justify="space-between" span="0">
            <p className="form-title">Sign in with an email</p>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Input
                type="email"
                placeholder="Email"
                value={email.value}
                handleChange={(e) => handleEmailChange(e.target.value)}
                valid={email.valid}
                errorMessage={email.errorType}
                isSubmitted={form.submit}
              />

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
              <div style={{ width: '100%' }}>
                <p>
                  Forgot your password? <Link to="/forget-password">Recover it</Link>
                </p>
              </div>
              <div style={{ width: '100%' }}>
                <p>
                  <button onClick={(e) => setDisplayRegister(true)}>Register</button>
                </p>
              </div>

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
          </FlexContainer>
        ) : (
          <RegisterForm setDisplayRegister={setDisplayRegister} />
        )}
      </LoginLayout>
    </ThemeProvider>
  );
}
