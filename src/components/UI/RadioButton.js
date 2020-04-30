import React from 'react'
import styled, { css } from 'styled-components'

const RadioButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;  
  padding: 0 5px 4px 5px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
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

const StyledRadioButton = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 1px solid ${props => props.checked ? props.theme.accentColors.primary.color : props.theme.baseColors.middleLight};
  border-radius: 100%;
  transition: all 150ms;

  ${props => props.checked ? css`
  border-width: 5px;
  `: null}

  ${props => props.disabled ? css`
  border-color: ${props => props.theme.baseColors.middleLight};
  `: null}

  ${HiddenRadioButton}:focus + & {
    box-shadow: 0px 0px 10px rgba(97, 124, 255, 0.3);
  }
`


const RadioButton = ({ className, onChange, checked, readonly, disabled, ...props }) => {
  const _onChange = (e) => {
    console.log("Cosa loca", e.target.value);
    !readonly && onChange && onChange(e.target.value);
  }
  return <RadioButtonContainer className={className} >
    <HiddenRadioButton checked={checked} onChange={_onChange} {...props} disabled={disabled} readonly={readonly} />
    <StyledRadioButton checked={checked} disabled={disabled} />
  </RadioButtonContainer>
}


export default RadioButton
