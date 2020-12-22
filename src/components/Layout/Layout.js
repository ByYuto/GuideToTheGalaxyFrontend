import React from 'react';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import Header from '../header-full/Header';
import useMobile from '../../hooks/useMobile';

const topBarVisibleSelector = (state) => state.app?.topBar?.visible;

const Layout = ({ children, home, noKeywords = false }) => {
  const isMobile = useMobile();
  const isTopBarVisible = useSelector(topBarVisibleSelector);
  const header = isTopBarVisible ?  <Header home={home} noKeywords={noKeywords} isMobile={isMobile} /> : null;
  return (
    <React.Fragment>
      {header}
      {children}
      {isTopBarVisible ? <Footer /> : null}
    </React.Fragment>
  );
};

export default Layout;
