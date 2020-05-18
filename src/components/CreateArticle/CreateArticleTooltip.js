import styled from 'styled-components';

const CreateArticleTooltip = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.accentColors.primary.color};
  padding: 16px;
  border-radius: 10px;
  max-width: 580px;
  min-width: 30px;
  min-height: 30px;

  &:before {
    position: absolute;
    content: '';
    display: block;
    border-style: solid;
    border-color: transparent ${(props) => props.theme.accentColors.primary.color} transparent transparent;
    border-width: 12px 12px 12px 0;
    right: 98%;
  }
`;

export default CreateArticleTooltip;
