import React from 'react';
import logo from '../assets/images/logo.png';
import dontPanic from '../assets/images/dont-panic.png';
import styled from 'styled-components';
import Button from './UI/Button';
import { GoPlus } from 'react-icons/go';
import Link from './UI/Link';
import { MdMenu } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Modal from './UI/modal/Modal';
import { useModal } from './UI/modal/useModal';
import Login from './login/Login';
import WithAuth from './login/withAuth';
import { useSelector } from 'react-redux';

const Separator = styled.div`
  display: block;
  border-left: 1px solid ${(props) => props.theme.baseColors.darker};
  height: 56px;
`;

const AddContentButton = styled(Button)`
  font-size: 24px;
`;

const MenuButton = styled(Button)`
  font-size: 34px;
`;

const NotificationsButton = styled(Button)`
  font-size: 30px;
`;

const TopBar = () => {
  const history = useHistory();
  const onAddContentClick = () => {
    history.push('/create');
  };
  const onTestComponentsClick = () => {
    history.push('/test-components');
  };
  const modal = useModal();
  return (
    <StyledTopBar>
      <div className="left">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
          <img src={dontPanic} alt="dont panic" />
        </Link>
        <Button primary onClick={onTestComponentsClick}>
          Test Components
        </Button>
      </div>
      <div className="middle"></div>
      <div className="right">
        <WithAuth
          component={null}
          componentReplacement={
            <>
              <Button primary onClick={modal.handleClick}>
                Log in
              </Button>{' '}
              <Modal
                title="Sign in"
                setVisibility={modal.handleClick}
                visible={modal.visible}
                elmHeight="auto"
                elmWidth="496px"
                footer={null}
              >
                <Login handleCancel={modal.handleClick} />
              </Modal>
            </>
          }
        />
        <Button primary>PRIMARY</Button>
        <Button primary rounded>
          PRIMARY ROUNDED
        </Button>
        <Button secondary>SECONDARY</Button>
        <Button secondary rounded>
          SECONDARY ROUNDED
        </Button>
        <Button circle>X</Button>
        <WithAuth
          component={
            <>
              <Button secondary onClick={onAddContentClick} circle icon>
                <GoPlus />
              </Button>
              <AddContentButton secondary circle onClick={onAddContentClick} icon>
                <GoPlus />
              </AddContentButton>
            </>
          }
          componentReplacement={
            <>
              <Button secondary onClick={modal.handleClick} circle icon>
                <GoPlus />
              </Button>
              <AddContentButton secondary circle onClick={modal.handleClick} icon>
                <GoPlus />
              </AddContentButton>
            </>
          }
        />
        <Separator />
        <NotificationsButton transparent secondary icon>
          <AiOutlineBell />
        </NotificationsButton>
        <MenuButton transparent secondary icon>
          <MdMenu />
        </MenuButton>
      </div>
    </StyledTopBar>
  );
};

const StyledTopBar = styled.div`
  background: ${(props) => props.theme.baseColors.dark};
  height: 88px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 24px 0 24px;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .logo {
      margin-right: 8px;
    }
  }
  .middle {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
  .right {
    display: flex;
    align-items: center;

    .menu-button {
      display: block;
      color: ${(props) => props.theme.baseColors.middleLight};
      font-size: 30px;
      height: 30px;
      line-height: 0;
    }
  }
`;

export default TopBar;
