import styled from 'styled-components';

export const InputLinkLayout = styled.div`
  width: 270px;
  margin-left: 8px;
  position: relative;
  background-color: white;
  z-index: 100;
  font-family: 'Open Sans';
  font-size: 14px;
  border: 1px solid #bdbfdf;
  color: #1f1f3d;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 3px 5px 3px 3px;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 95%;
  }

  & .close-btn {
    z-index: 101;
  }

  & .icon-search {
    width: 15px;
    height: auto;
  }

  & input {
    border: none !important;
    outline: 0 !important;
    padding: 7px 1px 7px 1px;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    background: white;
    width: 150px;
    overflow: hidden;
  }

  & .action-button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #6670f0;
    border: none;
    outline: 0;
    display: ${(props) => (props.disabled ? 'none' : 'inline-block')};
    cursor: pointer;
    z-index: 102;

    & svg path,
    svg rect {
      fill: white;
      stroke: white;
    }
  }
`;
export const ClearButton = styled.div`
  font-size: 30px;
  cursor: pointer;
  padding: 3px;
  color: ${(props) => props.theme.baseColors.middle};
`;
