import React from 'react';
import styled, { css } from 'styled-components';

const StyledMenuOption = styled.a`
  text-align: left;
  padding: 12px 16px;  
  font-size: 14px;
  position: relative;
  cursor: ${props => !!props.option.disabled ? "not-allowed" : "pointer"};
  color: ${ props => !!props.option.disabled ?
    (props.theme.isDark ? props.theme.baseColors.middle : props.theme.baseColors.middleLight)
    : (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
  
  &:after{
    content: '';
    display: block;
    position: absolute;
    border-bottom: 1px solid ${ props => props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.middleLight};
    bottom: 1px;
    left: 10px;
    right: 10px;
  }

  &:last-child:after{
    border-bottom: none;
  }

  &:hover {
    ${ props => !!!props.option.disabled ? css`color: ${props.theme.accentColors.primary.color}` : null};
    background-color: ${ props => props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.light};
  }
`;

/*
export const CustomMenuOption = props => {
  const { onClick, name, children, className } = props;
  const disabled = !!props.disabled;
  const _onClick = (e) => {
    console.log("El evento es", e);
    e.preventDefault();
    !disabled && onClick && onClick(name);
  }

  var dynamicProps = {};

  if (!disabled) {
    dynamicProps.tabIndex = 0;  //Allow focus
  }

  return <StyledMenuOption className={className} option={{ disabled: disabled, name: name }} {...dynamicProps} onClick={_onClick}>
    {children}
  </StyledMenuOption>
}
*/

const MenuOption = (props) => {
  const { option, onClick, className } = props;
  const disabled = !!option.disabled;
  const _onClick = (e) => {
    e.preventDefault();
    !!!option.disabled && onClick && onClick(option);
  }

  var dynamicProps = {};

  if (!disabled) {
    dynamicProps.tabIndex = 0;  //Allow focus
  }

  return <StyledMenuOption className={className} option={option} {...dynamicProps} onClick={_onClick}>
    {option ? option.label : ""}
  </StyledMenuOption>
}

export default styled(MenuOption)``;