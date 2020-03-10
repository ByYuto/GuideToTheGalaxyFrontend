import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import { IoIosClose } from 'react-icons/io';
const StyledInputContainer = styled.div`
  display: inline-block;
  position: relative;

  input {
    all: unset;
    
    font-family: 'Open Sans';
    border: 1px solid ${props => props.theme.isDark ? "transparent" : props.theme.baseColors.light};
    color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark};
    border-radius: 8px;
    font-size: 14px;
    line-height: 22px;
    padding: 9px 35px 9px 16px;
    background: ${props => props.theme.isDark ? props.theme.baseColors.darker : "white"};

    &:focus {
      border: 1px solid ${props => props.theme.accentColors.primary.color};
    }
    
    &::placeholder {
      color: ${props => props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle};
    }

    
  }

  &:focus-within {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);

    .clear {
      display: block;
      input {
        border: 1px solid ${props => props.theme.accentColors.primary.color};
      }
      &:hover{
        color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark};
      }
    }
    
  }

  .clear {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 30px;
    color: ${props => props.theme.baseColors.middle};
  }
`

const Input = ({ children, value, onChange, onClear, ...props }) => {
  const inputRef = useRef(null);
  const onInputChange = (e) => {
    onChange && onChange(e.target.value);
  }
  const onClearClick = (e) => {
    onChange && onChange("");
    inputRef.current.focus();
    onClear && onClear();
  }
  return <StyledInputContainer>
    <input ref={inputRef} {...props} value={value} onChange={onInputChange} />
    <Button className="clear" icon transparent onClick={onClearClick}><IoIosClose /></Button>
  </StyledInputContainer>
}

Input.defaultProps = {
  value: "",
  onChange: null,
  onClear: null
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func
}

export default Input;

