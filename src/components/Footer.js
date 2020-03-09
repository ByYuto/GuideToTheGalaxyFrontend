import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () =>
  <footer>
    <Link to="/about">About</Link> -
    <Link to="/help">Help</Link> -
    <Link to="/legal">Legal</Link>
  </footer>

export default Footer;
