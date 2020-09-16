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
import { BsLock } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { isRequired, validate, validateEmail } from '../../utils/validations';
import { loginAction } from '../../redux/actions/authActions';
import { Loader } from '../UI/Loader';

export default function Login({ handleCancel }) {
  const [form, setFormState] = useState({ valid: false, loading: false, error: false, errorType: '', submit: false });
  const [email, setEmail] = useState({ value: '', valid: false, errorType: '' });
  const [password, setPassword] = useState({ value: '', valid: false, errorType: '' });
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

  return (
    <ThemeProvider theme={{ isDark: true }}>
      <LoginLayout>
        <Button span="24px" darker elmWidth="232px" elmHeight="40px">
          <img src={GoogleLogo} />
          Sign up with Google
        </Button>
        <Button span="24px" darker elmWidth="232px" elmHeight="40px">
          <img src={FacebookLogo} />
          Sign up with Facebook
        </Button>
        <Divider />
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
                <Loader>
                  <div></div>
                  <div></div>
                </Loader>
              </FlexContainer>
            )}
            {error && <div className="error-message">{errorMessage}</div>}
          </form>
        </FlexContainer>
      </LoginLayout>
    </ThemeProvider>
  );
}
