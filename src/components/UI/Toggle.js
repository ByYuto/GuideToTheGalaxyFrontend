import React from 'react'
import styled, { css } from 'styled-components'

const ToggleContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;  
  padding: 0 5px 4px 5px;
`

// Hide Toggle visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenToggle = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledToggle = styled.div`
  display: block;
  width: 3em;
  height: 1.6em;
  box-sizing: border-box;
  border-radius: 3em;
  transition: all 150ms;
  position: relative;
  background-color: ${props => props.theme.isDark ? props.theme.baseColors.middle : props.theme.baseColors.dark};
  transition: all 0.2s;

  ${props => props.checked ? css`
    background-color: ${props => props.theme.accentColors.primary.color};
  `: null}

  ${props => props.disabled ? css`
    background-color: ${props => props.theme.baseColors.middleLight};
  `: null}

  &:after {
    content: "";
    width: 1.3em;
    height: 1.3em;
    background: white;
    position: absolute;
    top: 0.15em;
    left: 0.15em;
    border-radius: 3em;
    transition: all 0.2s;

    ${props => props.checked ? css`
      left: calc(100% - 0.15em - 1.3em);
    `: null}

  }
  
  ${HiddenToggle}:focus + & {
    box-shadow: 0px 0px 10px rgba(97, 124, 255, 0.3);
  }
`


const Toggle = ({ className, onChange, checked, disabled, readonly, ...props }) => {
  const _onChange = (e) => {
    !readonly && onChange && onChange(e.target.checked);
  }
  return <ToggleContainer className={className} checked={checked}>
    <HiddenToggle checked={checked} onChange={_onChange} disabled={disabled} readonly={readonly} {...props} />
    <StyledToggle checked={checked} disabled={disabled} />
  </ToggleContainer>
}


export default Toggle
