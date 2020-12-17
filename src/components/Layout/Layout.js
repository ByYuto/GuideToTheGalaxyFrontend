import React from 'react';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import Header from '../header-full/Header';

const topBarVisibleSelector = (state) => state.app?.topBar?.visible;

const Layout = ({ children, home, noKeywords = false }) => {
  const isTopBarVisible = useSelector(topBarVisibleSelector);
  const header = isTopBarVisible ?  <Header home={home} noKeywords={noKeywords} /> : null;
  return (
    <React.Fragment>
      {header}
      {children}
      {isTopBarVisible ? <Footer /> : null}
    </React.Fragment>
  );
};

export default Layout;
