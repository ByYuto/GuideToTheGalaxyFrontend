import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
`;

export const MaxWidthContainer = styled.div`
  max-width: 1016px;
  width: 100%;
  margin: auto;
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
    background: ${(props) => props.theme.baseColors.dark};
  }
`;

export const ArticleDetailContainer = styled.div`
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
    width: 100%;
    & img {
      width: 169px;
      height: auto;
      border-radius: 16px;
    }
  }

  & .header-content {
    padding-top: 24px;
    min-height: 221px;
  }

  & h2 {
    color: #f6f8ff;
    margin-top: 0;
  }

  & span {
    color: #bdbfdf;
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

  & .metadata-date {
    display: flex;
    align-items: center;
  }

  & .metadata-container {
    margin-top: 16px;
  }

  & .after-header-content {
    background: #151531;
    min-height: 64px;
    & > div {
      background: #151531;
      display: flex;
      justify-content: space-between;
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
`;
