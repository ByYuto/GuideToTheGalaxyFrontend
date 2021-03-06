import styled, { css } from 'styled-components';

export const EditorLayout = styled.div`
  position: relative;

  & .editor-container {
    padding: 0 16px;
    min-height: 70px;
  }
  & .DraftEditor-editorContainer,
  .DraftEditor-root {
    margin-top: 16px;

    position: relative;
    z-index: ${(props) => (props.linkPopupOpened ? 0 : 1)};
  }
  & .d-none {
    display: none;
  }

  & .DraftEditor-root {
    @media (max-width: 864px) {
      padding: 16px;
      & figure[contenteditable='false'] {
        margin: 0;
      }
    }
  }
`;

export const TextToolbarFixed = styled.div`
  width: 180px;
  position: ${({ editorOut, styledToolbarOut }) => (editorOut && !styledToolbarOut ? 'fixed' : 'relative')};
  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        top: ${({ editorOut, styledToolbarOut }) => {
          return editorOut && !styledToolbarOut ? '2vh' : '0';
        }};
        left: ${({ editorOut, styledToolbarOut }) => (editorOut && !styledToolbarOut ? '3vw' : '0')};
      `;
    }

    return css`
      top: ${({ editorOut, styledToolbarOut }) => {
        return editorOut && !styledToolbarOut ? '2vh' : '0';
      }};
      left: ${({ editorOut, styledToolbarOut }) => (editorOut && !styledToolbarOut ? '16.5vw' : '0')};
    `;
  }}

  display: ${({ editorOut, styledToolbarOut }) => (editorOut && !styledToolbarOut ? 'block' : 'none')};
  z-index: 5;
  opacity: ${({ isFocusEditor, embedActive }) => (isFocusEditor || embedActive ? 1 : 0)};
`;

export const MediaToolbarFixed = styled.div`
  width: 250px;
  position: ${({ editorOut, mediaToolbarOut }) => (editorOut && !mediaToolbarOut ? 'fixed' : 'relative')};

  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        top: ${({ editorOut, mediaToolbarOut }) => (editorOut && !mediaToolbarOut ? '72vh' : '0')};
        left: ${({ editorOut, mediaToolbarOut }) => (editorOut && !mediaToolbarOut ? '17vw' : '0')};
      `;
    }

    return css`
      top: ${({ editorOut, mediaToolbarOut }) => (editorOut && !mediaToolbarOut ? '70vh' : '0')};
      left: ${({ editorOut, mediaToolbarOut }) => (editorOut && !mediaToolbarOut ? '40vw' : '0')};
    `;
  }}

  display: ${({ editorOut, mediaToolbarOut }) => (editorOut && !mediaToolbarOut ? 'block' : 'none')};
  z-index: 5;
  opacity: ${({ isFocusEditor, embedActive }) => (isFocusEditor || embedActive ? 1 : 0)};
`;
