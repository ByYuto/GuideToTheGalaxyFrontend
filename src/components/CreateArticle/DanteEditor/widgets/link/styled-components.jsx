import styled from 'styled-components';

export const InputLinkLayout = styled.div`
width: 230px;
margin-left: 8px;
position: relative;
background-color: white;
z-index: 100;
@media (max-width: 600px) {
    width: 95%
  } 

  & .close-btn {
    margin-right: ${(props) => (props.disabled ? '0.5em' : '1.3em')};
    z-index: 101;
  }

  & .icon-search {
    margin-left: 10px;
  }

  & input {
      padding-left: 10px:
  }

  & input:focus {
    border: none;
    outline: 0;
  }

  & .action-button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #6670f0;
    border: none;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    display: ${(props) => (props.disabled ? 'none' : 'flex')};
    cursor: pointer;
    z-index: 102;

    & svg path, svg rect {
      fill: white;
      stroke: white;
    }
  }
`;
