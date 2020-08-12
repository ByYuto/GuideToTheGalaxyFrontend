import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.noMargin ? '0' : '24px')};
  & input {
    all: unset;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    display: block;
    width: 93%;
    border-radius: 8px;
    padding: 9px 16px;
    border: ${(props) => {
      if (props.isSubmitted) {
        return !props.valid ? 'solid 1px #F5374E' : 'none';
      } else {
        return 'none';
      }
    }};
    background: ${(props) => (props.theme.isDark ? props.theme.baseColors.darker : 'white')};

    &::placeholder {
      color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
    }
  }
  & .validation {
    color: #f5374e;
    font-size: 12px;
  }
`;

export default function Input(props) {
  const {
    type,
    placeholder,
    dark = true,
    value,
    handleChange,
    readonly = false,
    disabled = false,
    noMargin,
    label,
    valid,
    errorMessage,
    isSubmitted,
  } = props;
  const displayLabel = label ? <label>{label}</label> : null;
  return (
    <ThemeProvider theme={{ isDark: dark }}>
      <StyledInput noMargin={noMargin} valid={valid} isSubmitted={isSubmitted}>
        {displayLabel}

        <input
          type={type}
          value={value}
          readOnly={readonly}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {!valid && <span className="validation">{errorMessage}</span>}
      </StyledInput>
    </ThemeProvider>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
