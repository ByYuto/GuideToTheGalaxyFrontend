import React, { useState, useEffect } from 'react';
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
  ActivateSearchBtn,
} from './styled-components';
import DontPanic from '../../assets/images/dont-panic-lg.svg';
import { BellNotification, BurgerMenu, Logo, DontPanicLogo, SearchIcon, PlusIcon } from '../../assets/icons/svg-icons';
import { Avatar } from 'rsuite';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleSearch } from '../../redux/reducers/appState';

const TOP_DISTANCE_STICKY = 291;
const TOP_DISTANCE_SEARCH = 0;

const Header = ({ home = 'home', noKeywords, isMobile }) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const { showSearch } = useSelector((store) => store.app);
  const dispatch = useDispatch();
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

  const setHeightHelper = () => {
    if (isMobile && home === 'home') {
      return '500px';
    }
    if (!isMobile && home === 'home') {
      return '460px';
    }
    if (!isMobile && home !== 'home') {
      return '154px';
    }
    if (isMobile && home !== 'home') {
      return '174px';
    }
  };
  return (
    <>
      {stickyNav && <div style={{ height: setHeightHelper() }}></div>}
      <FullHeaderLayout
        isMobile={isMobile ? 1 : 0}
        home={home}
        isSticky={stickyNav ? 1 : 0}
        noKeywords={noKeywords ? 1 : 0}
      >
        <StyledTopBar home={home} isSticky={stickyNav ? 1 : 0}>
          <div className="left">
            <Link to="/">
              <Logo />
              {home === 'search' || stickyNav ? <DontPanicLogo className="dontpanic-logo" /> : null}
            </Link>
          </div>
          {!isMobile && <div className="middle">{home === 'search' || stickyNav ? <HeaderSearchBar /> : null}</div>}
          {isMobile && (
            <div className="middle">
              {home === 'search' || stickyNav ? (
                <ActivateSearchBtn onClick={() => dispatch(setVisibleSearch(!showSearch))} secondary circle icon>
                  <SearchIcon color="#9695B7" />
                </ActivateSearchBtn>
              ) : null}
            </div>
          )}
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
          {(isMobile && showSearch) || !isMobile ? (
            <>
              {!stickyNav && home === 'home' && (
                <StyledView>
                  <MaxWidthContainer className="main-hero-content">
                    <FlexContainer column justify="center" align="center">
                      {home === 'home' && !stickyNav && <img src={DontPanic} title="Don't Panic" alt="Don't Panic" />}
                      {home === 'home' && !stickyNav && (
                        <p className="home-main-text">
                          The Busker's Guide to the Galaxy will tell you everything you want to know about busking,
                          either as demonstrable facts or opinions from other people.
                        </p>
                      )}
                    </FlexContainer>
                  </MaxWidthContainer>
                </StyledView>
              )}
              {(!stickyNav && !isMobile && home === 'home') || isMobile ? (
                <StyledView>
                  <MaxWidthContainer className="main-hero-content">
                    <FlexContainer column justify="center" align="center">
                      <div className="searchbar-container-home">
                        <HeaderSearchBar />
                      </div>
                    </FlexContainer>
                  </MaxWidthContainer>
                </StyledView>
              ) : null}
            </>
          ) : null}
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
