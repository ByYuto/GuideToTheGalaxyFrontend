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
  padding-bottom: 10px;
  background-color: ${(props) => (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
  @media (max-width: 600px) {
    max-width: 100vw;
    width: 100%;
  }
`;

export const StyledView = styled(View)`
  justify-content: flex-start;
  overflow: auto;
  height: auto;
  position: relative;
  max-width: 100vw;
  width: 100%;
  & .create-article-divider {
    margin-bottom: 0;
    margin-top: 0;
  }

  & > * {
    flex: 0;
  }

  & .no-posts-container {
    background-color: white;
    min-height: 100px;
    padding-top: 30px;
  }

  ${MaxWidthContainer} {
    flex-grow: 1;
  }
`;

export const HomeLayout = styled.div`
  padding-bottom: 60px;
  max-width: 100vw;
  width: 100%;
`;
