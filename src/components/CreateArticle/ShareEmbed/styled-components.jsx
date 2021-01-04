import styled from 'styled-components';

export const ShareEmbedLayout = styled.div`
@media (max-width: 600px) {
    width: 95%
  } 

  & .close-btn {
    margin-right: ${(props) => (props.disabled ? '0.5em' : '1.3em')};;
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

    & svg path, svg rect {
      fill: white;
      stroke: white;
    }
  }
`;

export const EmbedLayout = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: black;
  & div {
    position: absolute;
    width: 100%;
    text-align: right;
    top: 0;

    & svg {
      color: #f6f8ff;
      font-size: 20px;
      font-size: 20px;
      margin: 15px 15px 0 0;
      cursor: pointer;
    }
  }
  & iframe {
    width: 100%;
    height: 500px;
    @media (max-width: 864px) {
      height: 200px;
    }
  }
`;
