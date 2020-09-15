import styled from 'styled-components';

export const SearchBarLayout = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans';
  padding: 8px;
  color: #1f1f3d;
  border-radius: 8px;
  width: 50%;

  @media (max-width: 600px) {
    width: 95%;
  } 

  & .close-btn {
      position: relative;
      margin-bottom: 10px;
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

    & svg path {
      fill: white;
    }
  }
`;
