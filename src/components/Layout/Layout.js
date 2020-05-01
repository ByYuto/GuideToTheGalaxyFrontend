import React from 'react';
import TopBar from '../TopBar';
import Footer from '../Footer';
import { useSelector } from 'react-redux';

const topBarVisibleSelector = state => state.app?.topBar?.visible;

const Layout = ({ children }) => {
  const isTopBarVisible = useSelector(topBarVisibleSelector);
  return <React.Fragment>
    {isTopBarVisible ? <TopBar /> : null}
    {children}
    {isTopBarVisible ? <Footer /> : null}
  </React.Fragment>

}

export default Layout;