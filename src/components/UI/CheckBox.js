import React from 'react'
import styled, { css } from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
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
  //display: none;
`

const StyledCheckbox = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.baseColors.middleLight};
  border-radius: 100%;
  //transition: all 150ms;

  ${props => props.checked ? css`
  border: 5px solid ${props => props.theme.accentColors.primary.color};
  `: null}

  ${HiddenCheckbox}:focus + & {
    //outline: ${props => props.theme.accentColors.primary.color}77 solid 3px;
  }
`


const Checkbox = ({ className, onChange, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} onChange={onChange} {...(!onChange ? { readOnly: true } : {})} />
    <StyledCheckbox checked={checked} />
  </CheckboxContainer>
)


export default Checkbox
