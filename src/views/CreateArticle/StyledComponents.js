import View from '../../components/View';
import styled from 'styled-components';
import CreateArticleTooltip from '../../components/CreateArticle/CreateArticleTooltip';
import {screen} from '../../utils/constants'



export const Fields = styled.div`
  max-width: 70%;
`;

export const StyledContent = styled.div``;

export const StyledCategorySelectorTooltip = styled(CreateArticleTooltip)`
  left: calc(100% + 12px);
  top: 0;
  width: calc((100vw - 1016px - 5%) / 2);
  z-index: 20;

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

  @media(max-width: ${screen.SM}) {
    position: absolute;
    
  }
`;

export const StyledFieldTooltip = styled(CreateArticleTooltip)`
  left: calc(100% + 12px);
  top: 0;
  width: calc((100vw - 1016px - 5%) / 2);
  z-index: 20;

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
  & .category-tooltip {
    top: 25%;
  }

  @media(max-width:${screen.SM}) {

    white-space: nowrap;
    position: relative;
    width: 100%;

    & .category-tooltip {
      top: 116px;
    }
  }
`;

export const StyledContentTypeSelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media(max-width:${screen.SM}) {
    & .subcategory-tooltip {
      top: 50px;
    }
  }

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

 

  ${MaxWidthContainer} {
    flex-grow: 1;
    background: ${(props) => props.theme.baseColors.dark};
  }
`;

export const StyledViewContent = styled(View)``;

export const CreateArticleContainerLayout = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  & .article-body-container {
    height: calc(100vh - 131px) !important;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media(max-width: ${screen.SM}) {
    display: block;
    & .article-body-container {
      display: block;
    }
  }
`;
