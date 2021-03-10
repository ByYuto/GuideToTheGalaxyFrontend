import React, { useState } from 'react';
import styled from 'styled-components';
import 'rsuite/dist/styles/rsuite-default.css';
import { Drawer } from 'rsuite';
import { Link } from 'react-router-dom';
import { screen } from '../../utils/constants';

const SidebarLayout = styled(Drawer)`
  @media (max-width: ${screen.SM}) {
    width: 300px !important;
  }

  & .rs-drawer-content {
    color: #bdbfdf;
    background-color: #151531;

    & .menu-list-item {
      list-style: none;
      color: #bdbfdf;
      & li {
        padding: 7px;
        border-bottom: 1px solid #1f1f3d;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          color: #6670f0;
          background-color: #1f1f3d;
        }

        & a {
          color: inherit;
          text-decoration: none;
          outline: 0;
        }
      }
    }
  }

  & .rs-drawer-header-close {
    color: #bdbfdf;
    font-size: 17px;
    &:hover {
      color: white;
    }
  }
`;

export default function Sidebar({ shown, isShown }) {
  return (
    <SidebarLayout show={shown} onHide={() => isShown(false)} backdropClassName="buskers">
      <Drawer.Header>
        <Drawer.Title></Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <ul className="menu-list-item">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/rules">Etiquette rules</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/about">About the busking project</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions">Terms and conditions</Link>
          </li>
          <li>
            <Link to="/faq">FAQ's</Link>
          </li>
          <li>
            <Link to="/create">Create Article</Link>
          </li>
        </ul>
      </Drawer.Body>
      <Drawer.Footer>footer</Drawer.Footer>
    </SidebarLayout>
  );
}
