import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { screen } from '../../../utils/constants';

export const ShareArticleLayout = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;

  & .articles-container {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 15px;
    ${(props) =>
      props.loading
        ? `
      display: flex;
      justify-content: center;
    `
        : `
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-row: auto;
    `}
  }

  @media (max-width: ${screen.SM}) {
    .articles-container {
      display: block;
    }
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ShareArticleCardLayout = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  height: 198px;
  -webkit-transform: translate3d(0, 0, 0);
  @media (max-width: ${screen.SM}) {
    margin-left: 0;
  }
  & .article-card {
    height: 198px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  & h4 {
    margin: 0;
    ${(props) => (props.existImage ? 'width: 199px;' : '')}
    padding: 5px;
    padding-left: 0;
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
    ${(props) => (props.existImage ? 'width: 199px;' : '')}
    overflow: hidden;
    color: #1f1f3d;
    margin-right: 10px;
    margin-top: 0;
  }

  & figure {
    margin: 0;
    width: 114px;
    height: 96px;
    overflow: hidden;
    border-radius: 16px;
    & img {
      width: 114px;
      height: auto;
      border-radius: 16px;
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

  & .post-content {
    padding-top: 16px;
  }

  & .keywords-container {
    width: 100%;
    overflow: hidden;
  }
`;

export const ShareArticleCardView = styled(Link)`
  margin-top: 24px;
  display: block;
  color: inherit;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  outline: 0;

  & .keywords-container {
    overflow-x: hidden;
    max-width: 808px;
  }

  & .tag-embed-post {
    &:first-child {
      margin-left: 0 !important;
    }
  }

  &:hover {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    outline: 0;
  }

  & h4 {
    margin: 0;
    padding: 5px 5px 5px 1px;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
  }
  & button svg path,
  button svg rect {
    fill: white;
  }

  & p {
    overflow: hidden;
    color: #1f1f3d;
    margin-right: 10px;
    margin-top: 0;
    font-family: Open Sans !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 22px !important;
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

  & .post-author-avatar {
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 0;

    & img {
      width: 32px;
      height: auto;
    }
  }

  & .author-metadata {
    font-family: Lato;
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
  }

  & .post-content {
    height: 138px;
    margin-top: 16px;
    @media (max-width: ${screen.SM}) {
      height: auto;
    }
  }
`;
export const ShareArticleCardPreview = styled.div`
  margin-top: 24px;
  display: block;
  color: inherit;
  cursor: pointer;
  outline: 0;
  & .tag-embed-post {
    &:first-child {
      margin-left: 0 !important;
    }
  }
  & h4 {
    margin: 0;
    padding: 5px 5px 5px 0;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
  }
  & button svg path,
  button svg rect {
    fill: white;
  }

  & p {
    overflow: hidden;
    color: #1f1f3d;
    margin-right: 10px;
    margin-top: 0;
    font-family: Open Sans !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 22px !important;
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

  & .post-author-avatar {
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 0;

    & img {
      width: 32px;
      height: auto;
    }
  }

  & .author-metadata {
    font-family: Lato;
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
  }

  & .post-content {
    height: 138px;
    margin-top: 16px;
    @media (max-width: ${screen.SM}) {
      height: auto;
    }
  }

  & a {
    color: inherit;
    text-decoration: none;
    outline: 0;
  }
`;
