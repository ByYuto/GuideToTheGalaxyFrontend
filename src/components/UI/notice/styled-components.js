import styled from 'styled-components';

export const NotifyLayout = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
  margin-top: 24px;
  & div {
    width: 314px;
    min-height: 56px;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 16px rgba(1, 1, 69, 0.24));
    color: ${(props) => (props.type === 'info' || props.type === 'error' ? 'white' : '#1f1f3d')};
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    text-align: center;

    padding: 16px;
    text-align: center;
    background-color: ${(props) => {
      switch (props.type) {
        case 'success':
          return '#BEF95C';
        case 'error':
          return '#F5374E';
        case 'warning':
          return '#F2F537';
        case 'info':
          return '#6670F0';
        default: 
          return '#BEF95C';
      }
    }};
  }
`;
