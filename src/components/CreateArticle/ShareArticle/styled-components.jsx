import styled from 'styled-components';

export const ShareArticleLayout = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  & .articles-container {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-row: auto;
  }

  @media (max-width: 600px) {
    .articles-container {
      grid-template-columns: 100%;
      grid-template-row: auto;
    }
  }
`;

export const ShareArticleCardLayout = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  & h4 {
    margin: 0;
    padding: 5px;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
  }
  & button svg path,
  button svg rect {
    fill: white;
  }

  & p {
    width: 199px;
    height: 100px;
    overflow: hidden;
    color: #1f1f3d;
    margin-right: 10px;
    margin-top: 0;
  }

  & figure {
    margin: 0;
    & img {
      width: 114px;
      height: auto;
      border-raidus: 16px;
    }
  }

  & .reactions-toolbar svg {
    margin-right: 10px;
  }

  & .breadcrumb {
    color: #9695b7;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 16px;
    /* identical to box height, or 160% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    & svg {
      margin: 0 5px;
    }
  }

  & .card-add-button {
    padding: 8px;
  }
`;
