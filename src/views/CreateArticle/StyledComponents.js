import View from '../../components/View';
import styled from 'styled-components';
import CreateArticleTooltip from '../../components/CreateArticle/CreateArticleTooltip';

export const Fields = styled.div`
  max-width: 70%;
`;

export const StyledContent = styled.div``;

export const StyledCategorySelectorTooltip = styled(CreateArticleTooltip)`
  left: calc(100% + 12px);
  top: 0;
  width: calc((100vw - 1016px - 5%) / 2);

  @media screen and (max-width: 1260px) {
    position: relative;
    top: 0;
    left: 0;
    margin-top: 12px;
    margin-bottom: 12px;
    width: 100%;
    max-width: none;
    text-align: center;

    &:before {
      border-bottom-color: ${(props) => props.theme.accentColors.primary.color};
      border-right-color: transparent;
      border-top-color: transparent;
      border-left-color: transparent;
      bottom: 98%;
      left: calc(50% - 12px);
      border-width: 0 12px 12px 12px;
    }
  }
`;

export const StyledFieldTooltip = styled(CreateArticleTooltip)`
  left: calc(100% + 12px);
  top: 0;
  width: calc((100vw - 1016px - 5%) / 2);
  z-index: 10;

  @media screen and (max-width: 1260px) {
    position: relative;
    top: 0;
    left: 0;
    margin-top: 12px;
    margin-bottom: 12px;
    width: 100%;
    max-width: none;
    text-align: center;

    &:before {
      border-bottom-color: ${(props) => props.theme.accentColors.primary.color};
      border-right-color: transparent;
      border-top-color: transparent;
      border-left-color: transparent;
      bottom: 98%;
      left: calc(50% - 12px);
      border-width: 0 12px 12px 12px;
    }
  }
`;

export const StyledCategorySelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledContentTypeSelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MaxWidthContainer = styled.div`
  max-width: 1016px;
  width: 100%;
  margin: auto;
`;

export const StyledView = styled(View)`
  min-height: 100vh;
  justify-content: space-between;
  overflow: auto;
  height: auto;

  & .create-article-divider {
    margin-bottom: 0;
  }

  & > * {
    flex: 0;
  }

  ${MaxWidthContainer} {
    flex-grow: 1;
    background: ${(props) => props.theme.baseColors.dark};
  }
`;

export const StyledViewContent = styled(View)``;
