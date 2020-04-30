import React from 'react';
import styled, { css } from 'styled-components';
import MenuOption from './MenuOption';

export const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid ${props => props.theme.isDark ? "transparent" : props.theme.baseColors.light};
  border-radius: 0px 0px 0px 0px;
  background: ${props => props.theme.isDark ? props.theme.baseColors.darker : "white"};
  color: ${props => props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle};
  max-height: 300px;
  overflow: auto;
  ${props => props.bottomRounded ? css`
    border-radius: 0px 0px 8px 8px;
  `: null}
}`;

export const CustomMenu = StyledMenu;
const Menu = ({ options, onOptionClick, ...props }) => <StyledMenu {...props}>
  {options ? options.map((option, key) => <MenuOption option={option} key={key} onClick={onOptionClick} />) : null}
</StyledMenu>

export default styled(Menu)``;