import React from 'react';
import TopBar from '../TopBar';
import Footer from '../Footer';

const Layout = ({ children }) =>
  <div className="layout">
    <TopBar />
    {children}
    <Footer />
  </div>


export default Layout;