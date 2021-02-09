import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Config from '../lib/Config';

const FooterLayout = styled.footer`
  display: flex;
  min-height: 60px;
  align-items: center;
  justify-content: center;
  position: relative;
  & a {
    color: #1f1f3d;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
  }
`;
const Footer = () =>
  !Config.HIDE_WHILE_LAUNCH ? (
    <FooterLayout>
      <Link to="/about">About</Link> -<Link to="/help">Help</Link> -<Link to="/legal">Legal</Link>
    </FooterLayout>
  ) : null;

export default Footer;
