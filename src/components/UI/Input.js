import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import { IoIosClose } from 'react-icons/io';
import Menu from './Menu';
import MenuOption from './MenuOption';

const StyledInputContainer = styled.div`
  display: inline-block;
  position: relative;

  ${Menu} {
    position: absolute;
    top: calc(100% - 1px);
    left: ${props => props.Icon ? 32 : 10}px;
    right: 0;
    z-index: 100;
  }
}`


const ClearButton = styled(Button)`
  display: none;
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 30px;
  color: ${props => props.theme.baseColors.middle};

  ${props => (props.show && !props.disabled) ? css`
    display: block;
    input {
      border: 1px solid ${props => props.theme.accentColors.primary.color};
    }
    &:hover{
      color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark};
    }
  ` : null}
`;

const StyledInput = styled.div`
  all: unset;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;
  overflow: hidden;

  border: 1px solid ${props => props.theme.isDark ? "transparent" : props.theme.baseColors.light};
  color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark};
  border-radius: 8px;

  ${props => props.optionsOpened ? css`
    border-bottom-right-radius: 1000;
    border-color: red;
  ` : null}
  ${props => props.focused && !props.disabled ? css`
    border: 1px solid ${props => props.theme.accentColors.primary.color};
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  ` : null}

  ${ props => props.squaredRight ? css`
       border-top-right-radius: 0px;
       border-bottom-right-radius: 0px;
    ` : null}
    ${ props => props.squaredLeft ? css`
       border-top-left-radius: 0px;
       border-bottom-left-radius: 0px;
    ` : null}

  input {
    all: unset;
    
    font-family: 'Open Sans';
    
    
    font-size: 14px;
    line-height: 22px;
    padding: 9px 35px 9px ${props => props.Icon ? 48 : 26}px;
    background: ${props => props.theme.isDark ? props.theme.baseColors.darker : "white"};

   
    
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
  
  ${props => props.disabled ? css`
    input { 
      color: ${props => props.theme.isDark ? props.theme.baseColors.darkMiddle : props.theme.baseColors.middleLight};

      &::placeholder {
        color: ${props => props.theme.isDark ? props.theme.baseColors.darkMiddle : props.theme.baseColors.middleLight};
      }
    }` : null}

  ${props => {
    return (props.show && !props.disabled) ? css`
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

const autoCloseTime = 50;
const Input = ({ children, value, onChange, onClear, disabled, Icon, squaredRight, squaredLeft, autoCompleteOptions, ...props }) => {
  const inputRef = useRef(null);

  const [focusedCount, setFocusedCount] = useState(0);
  const [focused, setFocused] = useState(false);
  const [optionsOpened, setOptionsOpened] = useState(false);

  useEffect(() => {
    console.log("Setting Timer")
    let timeout = setTimeout(() => {
      console.log("Focused", focused);
      if (!focused) {
        setOptionsOpened(false);
      }
    }, autoCloseTime);

    return () => { console.log("Cancelando timer"); clearTimeout(timeout) };
  }, [focused]);

  const onFocus = (e) => {
    console.log("Focus", e.target);
    setFocused(true);
  }
  const onBlur = (e) => {
    console.log("Blur", e.target);
    setFocused(false);
    setFocusedCount(0);
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    if (value.length >= 3) {
      setOptionsOpened(true);
    }
    onChange && onChange(value);
  }
  const onClearClick = (e) => {
    onChange && onChange("");
    inputRef.current.focus();
    onClear && onClear();
    setOptionsOpened(false);
  }
  const onOptionClick = (label) => {
    console.log("hizo click en la opción", label);
    onChange(label);
    setOptionsOpened(false);
  }

  const onInputClick = () => {
    if (focusedCount > 1) {
      setOptionsOpened(true);
    }
    setFocusedCount(focusedCount + 1);
  }

  return <StyledInputContainer onFocus={onFocus} onBlur={onBlur} focused={focused} onClick={onInputClick} optionsOpened={optionsOpened} Icon={Icon}>
    <StyledInput tabIndex={-1} disabled={disabled} Icon={Icon} squaredRight={squaredRight} squaredLeft={squaredLeft} focused={focused} optionsOpened={optionsOpened}>
      <div>
        {Icon ? <Icon className="icon" /> : null}
      </div>
      <input ref={inputRef} {...props} value={value} disabled={disabled} onChange={onInputChange} />
      <div>
        { /* <Button className="clear" icon transparent onClick={onClearClick} ><IoIosClose /></Button> */}
        <ClearButton icon transparent onClick={onClearClick} show={!!value.trim()}><IoIosClose /></ClearButton>
      </div>
    </StyledInput >
    {autoCompleteOptions && optionsOpened ?
      <Menu>
        {autoCompleteOptions.map((option, key) =>
          <MenuOption label={option.label} key={key} onClick={onOptionClick} />
        )}
      </Menu>
      : null
    }
  </StyledInputContainer>
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
      label: "option 2"
    },
    {
      value: 2,
      label: "option 3"
    }
  ]
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

