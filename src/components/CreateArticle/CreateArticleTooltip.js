import styled from 'styled-components';

const CreateArticleTooltip = styled.div`
  position: absolute;
  background-color: ${props => props.theme.accentColors.primary.color};
  padding: 16px;
  border-radius: 10px;
  max-width: 580px;
  min-width: 30px;
  min-height: 30px;

  &:before {
    position: absolute;
    content: "";
    display: block;
    border: 12px solid ${props => props.theme.accentColors.primary.color};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    right: 98%;
  }
`;


export default CreateArticleTooltip;