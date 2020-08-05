import React from 'react';
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

export default function Login({ handleCancel }) {
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
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" noMargin />
          <div style={{ width: '100%' }}>
            <p>
              Forgot your password? <Link to="/forget-password">Recover it</Link>
            </p>
          </div>

          <FlexContainer span="0" padding="0">
            <Button span="24px" onClick={handleCancel} rounded secondary>
              Cancel
            </Button>
            <Button span="24px" rounded>
              Log in
            </Button>
          </FlexContainer>
        </FlexContainer>
      </LoginLayout>
    </ThemeProvider>
  );
}
