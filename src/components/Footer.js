import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterLayout = styled.footer`
  display: flex;
  min-height: 60px;
  align-items: center;
  justify-content: center;
  position: relative;
  & a {
    color: #1f1f3d;
  }
`;
const Footer = () => (
  <FooterLayout>
    <Link to="/about">About</Link> -<Link to="/help">Help</Link> -<Link to="/legal">Legal</Link>
  </FooterLayout>
);

export default Footer;
