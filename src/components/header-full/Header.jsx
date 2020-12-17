import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import dontPanic from '../../assets/images/dont-panic.png';
import { GoPlus } from 'react-icons/go';
import Link from '../UI/Link';
import { useHistory } from 'react-router-dom';
import Modal from '../UI/modal/Modal';
import Sidebar from '../UI/Sidebar';
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
import { BellNotification, BurgerMenu, Logo, DontPanicLogo } from '../../assets/icons/svg-icons';
import { Avatar } from 'rsuite';
import { AiOutlineUser } from 'react-icons/ai';

const TOP_DISTANCE_STICKY = 291;
const TOP_DISTANCE_SEARCH = 0;

const Header = ({ home = 'home', noKeywords }) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const onAddContentClick = () => {
    history.push('/create');
  };
  const [stickyNav, setStickyNav] = useState(false);
  const modal = useModal();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const headerHeight = home === 'home' ? TOP_DISTANCE_STICKY : TOP_DISTANCE_SEARCH;
      setStickyNav(window.scrollY > headerHeight);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        const headerHeight = home === 'home' ? TOP_DISTANCE_STICKY : TOP_DISTANCE_SEARCH;
        setStickyNav(window.scrollY > headerHeight);
      });
    };
  }, [window.scrollY]);
  return (
    <>
      {stickyNav && <div style={{ height: home === 'home' ? '460px' : '154px' }}></div>}
      <FullHeaderLayout home={home} isSticky={stickyNav ? 1 : 0} noKeywords={noKeywords ? 1 : 0}>
        <StyledTopBar home={home} isSticky={stickyNav ? 1 : 0}>
          <div className="left">
            <Link to="/">
              <Logo />
              {home === 'search' || stickyNav ? <DontPanicLogo className="dontpanic-logo" /> : null}
            </Link>
          </div>
          <div className="middle">{home === 'search' || stickyNav ? <HeaderSearchBar /> : null}</div>
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
                <>
                  <NotificationsButton transparent secondary icon>
                    <BellNotification />
                  </NotificationsButton>
                  <Avatar circle>
                    <AiOutlineUser />
                  </Avatar>
                </>
              }
              componentReplacement={
                <>
                  <LoginButton onClick={modal.handleClick}>Log in</LoginButton>
                  <ThemeProvider theme={{ isDark: true }}>
                    <Modal
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
            <MenuButton transparent secondary icon onClick={() => setMenuOpen(true)}>
              <BurgerMenu />
            </MenuButton>
            <Sidebar shown={menuOpen} isShown={setMenuOpen} />
          </div>
        </StyledTopBar>
        <ThemeProvider theme={{ isDark: true }}>
          {home === 'home' && !stickyNav && (
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
          {!noKeywords && (
            <StyledView className="header-keywords">
              <KeywordsSection />
            </StyledView>
          )}
        </ThemeProvider>
      </FullHeaderLayout>
    </>
  );
};
export default Header;
