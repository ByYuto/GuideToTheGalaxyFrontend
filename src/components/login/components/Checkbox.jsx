import React from 'react';
import styled, { css } from 'styled-components';
import { FaCheck } from 'react-icons/fa';
const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  padding: 0 5px 4px 5px;
`;

const CheckMark = styled(FaCheck)`
  position: absolute;
  color: white;
  font-size: 0.8em;
`;
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
`;

const StyledCheckbox = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.baseColors.middleLight};
  border-radius: 4px;
  transition: all 150ms;

  ${(props) =>
    props.checked
      ? css`
          background-color: ${(props) =>
            props.disabled ? props.theme.baseColors.middleLight : props.theme.accentColors.primary.color};
          border-width: 0;
        `
      : null}

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0px 0px 10px rgba(97, 124, 255, 0.3);
  }
`;

const Checkbox = ({ className, onChange, checked, disabled, readonly, ...props }) => {
  const _onChange = (e) => {
    !readonly && onChange && onChange(e.target.checked);
  };

  return (
    <CheckboxContainer className={className} checked={checked} onClick={props.onClick}>
      <HiddenCheckbox
        checked={checked}
        onChange={_onChange}
        disabled={disabled}
        readonly={readonly}
        {...props}
        ref={props.refCheckBox}
      />
      <StyledCheckbox checked={checked} disabled={disabled} />
      {checked ? <CheckMark /> : null}
    </CheckboxContainer>
  );
};

export default Checkbox;
