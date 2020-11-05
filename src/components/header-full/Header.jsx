import React from 'react';
import logo from '../../assets/images/logo.png';
import dontPanic from '../../assets/images/dont-panic.png';
import { GoPlus } from 'react-icons/go';
import Link from '../UI/Link';
import { MdMenu } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Modal from '../UI/modal/Modal';
import { useModal } from '../UI/modal/useModal';
import Login from '../login/Login';
import WithAuth from '../login/withAuth';
import { ThemeProvider } from 'styled-components';
import HeaderSearchBar from '../HeaderSearchBar/HeaderSearchBar';
import FlexContainer from '../UI/FlexContainer';
import KeywordsSection from './KeywordsSection';
import {
  Separator,
  AddContentButton,
  MenuButton,
  NotificationsButton,
  LoginButton,
  StyledTopBar,
  StyledView,
  MaxWidthContainer,
  FullHeaderLayout,
} from './styled-components';
import DontPanic from '../../assets/images/dont-panic-lg.svg';
const Header = ({ home = 'home' }) => {
  const history = useHistory();
  const onAddContentClick = () => {
    history.push('/create');
  };
  const modal = useModal();
  return (
    <FullHeaderLayout home={home}>
      <StyledTopBar home={home ? 'home' : 'search'}>
        <div className="left">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" />
            {home === 'search' && <img src={dontPanic} alt="dont panic" />}
          </Link>
        </div>
        <div className="middle">{home === 'search' && <HeaderSearchBar />}</div>
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
          <MenuButton transparent secondary icon>
            <MdMenu />
          </MenuButton>
        </div>
      </StyledTopBar>
      <ThemeProvider theme={{ isDark: true }}>
        {home === 'home' && (
          <StyledView>
            <MaxWidthContainer className="main-hero-content">
              <FlexContainer column justify="center" align="center">
                <img src={DontPanic} title="Don't Panic" alt="Don't Panic" />
                <p className="home-main-text">
                  The Busker's Guide to the Galaxy will tell you everything you want to know about busking, either as
                  demonstrable facts or opinions from other people.
                </p>
                <div className="searchbar-container-home">
                  <HeaderSearchBar />
                </div>
              </FlexContainer>
            </MaxWidthContainer>
          </StyledView>
        )}
        <StyledView className="header-keywords">
          <KeywordsSection />
        </StyledView>
      </ThemeProvider>
    </FullHeaderLayout>
  );
};
export default Header;
