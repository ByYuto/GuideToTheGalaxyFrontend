import styled, { css } from 'styled-components';

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: ${props => props.Icon ? 32 : 10}px;
  border: 1px solid ${props => props.theme.isDark ? "transparent" : props.theme.baseColors.light};
  border-radius: 0px 0px 0px 0px;
  background: ${props => props.theme.isDark ? props.theme.baseColors.darker : "white"};
  color: ${props => props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle};

  ${props => props.bottomRounded ? css`
    border-radius: 0px 0px 8px 8px;
  `: null}
}`

export default Menu;