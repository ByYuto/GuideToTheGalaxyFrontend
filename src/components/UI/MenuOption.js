import React from 'react';
import styled from 'styled-components';

const StyledMenuOption = styled.a`
  text-align: left;
  padding: 12px 16px;  
  font-size: 14px;
  position: relative;
  
  &:after{
    content: '';
    display: block;
    position: absolute;
    border-bottom: 1px solid ${props => props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.middleLight};
    bottom: 1px;
    left: 10px;
    right: 10px;
  }

  &:hover {
    color: ${props => props.theme.accentColors.primary.color};
    background-color: ${props => props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.light};
  }
`;

const MenuOption = ({ label, onClick }) => {
  const _onClick = (e) => {
    e.preventDefault();
    onClick && onClick(label);
  }
  return <StyledMenuOption tabIndex={0} onClick={_onClick}>
    {label}
  </StyledMenuOption>
}

export default styled(MenuOption)``;