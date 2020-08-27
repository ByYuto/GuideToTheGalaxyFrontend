import styled from 'styled-components';
import { screen } from '../../../utils/constants';

export const ModalLayout = styled.div`
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  & .modal-body {
    min-height: ${(props) => (props.elmHeight ? props.elmHeight : '354px')};
    min-width: ${(props) => (props.elmWidth ? props.elmWidth : '600px')};
    background-color: ${(props) => (props.theme.isDark ? '#1f1f3d' : '#FFFFFF')};
    border-radius: 16px;
    color: ${(props) => (props.theme.isDark ? '#bdbfdf' : '#1F1F3D')};
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & svg {
      color: #9695b7;
      cursor: pointer;
    }

    & .modal-header {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid ${(props) => (props.theme.isDark ? '#151531' : '#F6F8FF')};
      align-items: center;

      & h4 {
        margin: 0;
        text-transform: uppercase;
        font-weight: bold;
      }
    }

    & .modal-footer {
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & .modal-content {
      flex-grow: 2;
    }

    @media (max-width: ${screen.SM}) {
      min-width: 300px;
    }
  }
`;
