import View from '../../components/View';
import styled from 'styled-components';
import CreateArticleTooltip from '../../components/CreateArticle/CreateArticleTooltip';

export const StyledContent = styled.div``;

export const StyledCategorySelectorTooltip = styled(CreateArticleTooltip)`
  left: calc(100% + 12px);
  top: 0;
  width: 100px;
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
    }
  }
`;

export const StyledCategorySelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const StyledContentTypeSelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const MaxWidthContainer = styled.div`
  max-width: 1016px;
  width: 100%;
  margin: auto;
`;

export const StyledView = styled(View)`
  height: 100%;
  justify-content: start;
  & > * {
    flex: 0;
  }

  ${MaxWidthContainer} {
    flex-grow: 1;
    background: ${(props) => props.theme.baseColors.dark};
  }
`;
