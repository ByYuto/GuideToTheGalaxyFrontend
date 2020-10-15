import styled from 'styled-components';

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
    z-index: ${(props) => (props.linkInputActive ? 0 : 1)};
  }
  & .d-none {
    display: none;
  }
`;
