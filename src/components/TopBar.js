import React from 'react';
import logo from '../assets/images/logo.png';
import dontPanic from '../assets/images/dont-panic.png';
import styled from 'styled-components';
import Button from './UI/Button';
import { GoPlus } from 'react-icons/go';
import Link from './UI/Link';
import { MdMenu } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Modal from './UI/modal/Modal';
import { useModal } from './UI/modal/useModal';
import Login from './login/Login';
import WithAuth from './login/withAuth';
import { ThemeProvider } from 'styled-components';
import HeaderSearchBar from './HeaderSearchBar/HeaderSearchBar';
import Sidebar from './UI/Sidebar';
import { useState } from 'react';


const Separator = styled.div`
  display: block;
  border-left: 1px solid ${(props) => props.theme.baseColors.darker};
  height: 56px;
  margin-left: 16px;
  margin-right: 16px;
`;

const AddContentButton = styled(Button)`
  font-size: 24px;
`;

const MenuButton = styled(Button)`
  font-size: 34px;
`;

const NotificationsButton = styled(Button)`
  font-size: 30px;
`;

const LoginButton = styled.button`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #6670f0;
  background: none;
  outline: 0;
  border: none;
  cursor: pointer;
`;

const TopBar = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const onAddContentClick = () => {
    history.push('/create');
  };
  const modal = useModal();
  const showSettings = (event) => {
    event.preventDefault();
  }
  return (
    <StyledTopBar id="outer-container">
      <div className="left">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
          <img src={dontPanic} alt="dont panic" />
        </Link>
      </div>
      <div className="middle">
        <HeaderSearchBar />
      </div>
      <div className="right">
        <WithAuth
          component={
            <>
              <AddContentButton secondary circle onClick={onAddContentClick} icon>
                <GoPlus />
              </AddContentButton>
            </>
          }
          componentReplacement={
            <>
              <AddContentButton secondary circle onClick={modal.handleClick} icon>
                <GoPlus />
              </AddContentButton>
            </>
          }
        />
        <Separator />

        <WithAuth
          component={
            <NotificationsButton transparent secondary icon>
              <AiOutlineBell />
            </NotificationsButton>
          }
          componentReplacement={
            <>
              <LoginButton onClick={modal.handleClick}>Log in</LoginButton>
              <ThemeProvider theme={{ isDark: true }}>
                <Modal
                  title="Sign in"
                  setVisibility={modal.handleClick}
                  visible={modal.visible}
                  elmHeight="auto"
                  elmWidth="496px"
                  footer={null}
                >
                  <Login handleCancel={modal.handleClick} />
                </Modal>
              </ThemeProvider>
            </>
          }
        />
        <MenuButton transparent secondary icon onClick={()=> setMenuOpen(true)}>
          <MdMenu />
        </MenuButton>
        <Sidebar shown={menuOpen} isShown={setMenuOpen} />
      </div>
    </StyledTopBar>
  );
};

const StyledTopBar = styled.div`
  background: ${(props) => props.theme.baseColors.dark};
  height: 88px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 24px 0 24px;
  box-shadow: 20px 0 #151531;
  border-bottom: solid 1px #151531;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .logo {
      margin-right: 8px;
    }
  }
  .middle {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
    justify-content: center;
  }
  .right {
    display: flex;
    align-items: center;

    .menu-button {
      display: block;
      color: ${(props) => props.theme.baseColors.middleLight};
      font-size: 30px;
      height: 30px;
      line-height: 0;
    }
  }
`;

export default TopBar;
