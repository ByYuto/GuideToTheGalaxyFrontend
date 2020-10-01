import React from 'react';
import TopBar from '../TopBar';
//import Footer from '../Footer';
import { useSelector } from 'react-redux';
import Header from '../header-full/Header';

const topBarVisibleSelector = (state) => state.app?.topBar?.visible;

const Layout = ({ children, home }) => {
  const isTopBarVisible = useSelector(topBarVisibleSelector);
  const header = isTopBarVisible ? home ? <Header home={home} /> : <TopBar /> : null;
  return (
    <React.Fragment>
      {header}
      {children}
      {/*isTopBarVisible ? <Footer /> : null*/}
    </React.Fragment>
  );
};

export default Layout;
