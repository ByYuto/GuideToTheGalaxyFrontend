import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
`;

export const MaxWidthContainer = styled.div`
  max-width: 900px;
  width: 100%;
  margin: auto;
  background-color: ${(props) => (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
`;

export const StyledView = styled(View)`
  justify-content: flex-start;
  overflow: auto;
  height: auto;
  position: relative;

  & .create-article-divider {
    margin-bottom: 0;
    margin-top: 0;
  }

  & > * {
    flex: 0;
  }

  ${MaxWidthContainer} {
    flex-grow: 1;
  }
`;

export const ArticleDetailContainer = styled.div`
  padding-bottom: 80px;

  & .DraftEditor-root {
    @media (max-width: 864px) {
      padding: 16px;
      & figure[contenteditable='false'] {
        margin: 0;
        & img {
          border-radius: 16px;
        }
      }

      & div[aria-label='Photos'] {
        height: auto;
      }
    }
  }
  & .discontinued-date-label {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: #e3bbea;
    margin-left: 10px;
  }
  & .footer-author-meta {
    margin-top: 24px;
    @media (max-width: 864px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  & .contributions-bar {
    padding-left: 42px;
    padding-right: 10px;

    & .contributions-number {
      margin-right: 10px;
    }
    & span {
      color: #1f1f3d;
      cursor: pointer;
    }
    & svg {
      cursor: pointer;
    }
  }
  & .reactions-column {
    margin-top: 24px;
    @media (max-width: 864px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  & .edit-lock {
    & svg {
      margin-right: 7px;
    }
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

  & figure.featured-img {
    margin: 0;
    width: 169px;
    height: 138px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    & img {
      width: 100%;
      height: auto;
      border-radius: 16px;
    }
  }

  & .header-content {
    padding-top: 24px;
    min-height: 221px;
    @media (max-width: 864px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  & h2 {
    color: #f6f8ff;
    margin-top: 0;
  }

  & .edit-lock {
    color: #bdbfdf;
  }

  & .delete-pdf {
    color: #6670f0;
  }

  & .head-article-content-icon path,
  .head-article-content-icon rect {
    fill: #bdbfdf;
  }
  & .head-article-content-icon-link path,
  .head-article-content-icon-link rect {
    fill: #6670f0;
  }

  & .head-article-content-icon-link,
  .head-article-content-icon {
    margin-right: 10px;
  }

  & .metadata-url a {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  & .button-buy {
    margin-top: 16px;
    & a {
      color: white;
      margin-top: 0;
      font-family: Lato;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      padding-left: 20px;
      padding-right: 20px;
      text-decoration: none;
    }
  }

  & .post-metadata-date {
    color: #9695b7;
  }

  & .metadata-date {
    display: flex;
    align-items: center;
    margin-top: 12px;
    color: #9695b7;
  }

  & .metadata-container {
    margin-top: 16px;
    @media (max-width: 864px) {
      flex-direction: column;
      & .metadata-url {
        margin-bottom: 16px;
      }
      & .featured-img-container {
        margin-top: 16px;
        & figure {
          margin: 0;
        }
      }
    }
  }

  & .after-header-content {
    background: #151531;
    min-height: 64px;
    & > div {
      background: #151531;
      display: flex;
      justify-content: space-between;
    }

    @media (max-width: 864px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  & .author-metadata {
    font-family: Lato;
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
  }

  & .post-author-avatar {
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0;
    margin-right: 10px;
    margin-bottom: 0;

    & img {
      width: 32px;
      height: auto;
    }
  }

  & .content-container {
    > p,
    > div,
    iframe {
      margin-top: 30px;
      margin-bottom: 30px;
    }

    > p:first-child {
      margin-top: 50px;
    }
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  max-width: 100%;
  height: 512px;
  justify-content: space-between;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px 0;
`;

export const ImageWrapper = styled.picture`
  position: relative;
  width: ${({ position, length }) => {
    if (position === 0 && length === 1) {
      return '100%';
    } else {
      return 'calc(50% - 2px)';
    }
  }};
  height: ${({ position, length }) => {
    if ((position === 0 && length >= 1 && length <= 3) || (position === 1 && length === 2)) {
      return '100%';
    } else {
      return '254px';
    }
  }};
  margin-right: ${({ position, length }) => {
    if ((position === 0 && length > 1) || (position === 1 && length > 3)) {
      return '4px';
    } else {
      return 0;
    }
  }};
  margin-bottom: 0;
`;

export const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  user-select: none;
`;

export const CloseButton = styled.div.attrs(() => ({
  role: 'button',
  dataFocusable: true,
  tabIndex: 0,
  ariaLabel: 'Erase image',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.77);
  min-height: 30px;
  min-width: 30px;
  outline-style: none;
  transition-duration: 0.2s;
  padding: 0px;
  border-radius: 9999px;

  &:hover {
    background-color: rgba(26, 26, 26, 0.77);
  }
`;

export const AddButton = styled.div.attrs(() => ({
  role: 'button',
  dataFocusable: true,
  tabIndex: 0,
  ariaLabel: 'Add image',
}))`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 16px;
  right: 16px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.77);
  min-height: 80px;
  min-width: 80px;
  outline-style: none;
  transition-duration: 0.2s;
  padding: 0px;
  border-radius: 9999px;
  padding: 0 15px;
  &:hover {
    background-color: rgba(26, 26, 26, 0.77);
  }
`;

export const ButtonLabel = styled.span`
  font-size: 14px;
  line-height: 1.8;
  color: #ffffff;
  text-align: center;
  user-select: none;
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
  }
`;
