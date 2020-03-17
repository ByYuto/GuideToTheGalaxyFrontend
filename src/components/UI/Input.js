import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
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
    ${ props => props.squaredRight ? css`
       border-top-right-radius: 0px;
       border-bottom-right-radius: 0px;
    ` : null}
    ${ props => props.squaredLeft ? css`
       border-top-left-radius: 0px;
       border-bottom-left-radius: 0px;
    ` : null}
    font-size: 14px;
    line-height: 22px;
    padding: 9px 35px 9px ${props => props.Icon ? 48 : 26}px;
    background: ${props => props.theme.isDark ? props.theme.baseColors.darker : "white"};

    ${props => props.focused ? css`
      border: 1px solid ${props => props.theme.accentColors.primary.color};
      box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    ` : null}
    
    &::placeholder {
      color: ${props => props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.darkMiddle};
    }    
  }

  .icon {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 18px;    
    padding: 13px 0 0 16px;
    color: ${props => props.theme.isDark ?
    (props.disabled ? props.theme.baseColors.darkMiddle : props.theme.accentColors.primary.color)
    : (props.disabled ? props.theme.baseColors.light : props.theme.baseColors.middleLight)};
  }

  .clear {
    display: none;
    position: absolute;
    right: 0;
    top: 5px;
    font-size: 30px;
    color: ${props => props.theme.baseColors.middle};
  }

  ${props => props.disabled ? css`
    input { 
      color: ${props => props.theme.isDark ? props.theme.baseColors.darkMiddle : props.theme.baseColors.middleLight};

      &::placeholder {
        color: ${props => props.theme.isDark ? props.theme.baseColors.darkMiddle : props.theme.baseColors.middleLight};
      }
    }` : null}

  ${props => {
    return (props.showClearButton && !props.disabled) ? css`
    .clear {
      display: block;
      input {
        border: 1px solid ${props => props.theme.accentColors.primary.color};
      }
      &:hover{
        color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark};
      }
    }`
      : null
  }}
`

const Input = ({ children, value, onChange, onClear, disabled, Icon, squaredRight, squaredLeft, autoCompleteOptions, ...props }) => {
  const inputRef = useRef(null);
  const onInputChange = (e) => {
    const value = e.target.value;
    onChange && onChange(value);
  }
  const onClearClick = (e) => {
    onChange && onChange("");
    inputRef.current.focus();
    onClear && onClear();
  }

  const [focused, setFocused] = useState(false);
  const onFocus = (e) => { console.log("Set focus", e); setFocused(true); }
  const onBlur = (e) => { console.log("lost focus", e); setFocused(false); }

  return <StyledInputContainer showClearButton={!!value.trim()} disabled={disabled} Icon={Icon} onFocus={onFocus} onBlur={onBlur} squaredRight={squaredRight} squaredLeft={squaredLeft} focused={focused}>
    {Icon ? <Icon className="icon" /> : null}
    <input ref={inputRef} {...props} value={value} disabled={disabled} onChange={onInputChange} />
    <Button className="clear" icon transparent onClick={onClearClick} ><IoIosClose /></Button>
    {/*autoCompleteOptions ?
      <div>
        HOLA MUNDO
      </div>
      : null
    */}
    <div>

    </div>
  </StyledInputContainer >
}

Input.defaultProps = {
  value: "",
  onChange: null,
  onClear: null,
  disabled: false,
  Icon: null,
  squaredRight: false,
  squaredLeft: false,
  autoCompleteOptions: [
    {
      value: 1,
      label: "option 1"
    },
    {
      value: 1,
      label: "option 1"
    },
    {
      value: 2,
      label: "option 1"
    }
  ],
  isLoading: false
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  disabled: PropTypes.bool,
  Icon: PropTypes.elementType,
  squaredRight: PropTypes.bool,
  squaredLeft: PropTypes.bool,

}

export default Input;

