import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import { IoIosClose } from 'react-icons/io';
import Menu from './Menu';

/*
const AutocompleteMenu = styled(Menu)`
  position: absolute;
  top: calc(100% - 1px);
  left: ${props => props.Icon ? 32 : 10}px;
  right: 0;
  z-index: 100;
`
*/

const StyledInputContainer = styled.div`
  display: ${(props) => (props.block ? 'flex' : 'inline-block')};
  position: relative;
  flex: 1;
  justify-content: center;
  ${(props) =>
    props.theme.isDark
      ? `background-color: #151531;
  border-radius: 8px;`
      : ''}

  ${Menu} {
    position: absolute;
    top: 100%;
    left: ${(props) => (props.Icon ? 32 : 10)}px;
    right: 0;
    z-index: 100;
  }
}`;

const ClearButton = styled(Button)`
  display: none;
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 30px;
  color: ${(props) => props.theme.baseColors.middle};

  ${(props) =>
    props.show && !props.disabled
      ? css`
          display: block;
          input {
            border: 1px solid ${(props) => props.theme.accentColors.primary.color};
          }
          &:hover {
            color: ${(props) => (props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark)};
          }
        `
      : null}
`;

const StyledInput = styled.div`
  all: unset;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;
  overflow: hidden;
  flex: 1;

  border: 1px solid ${(props) => (props.theme.isDark ? 'transparent' : props.theme.baseColors.middleLight)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark)};
  border-radius: ${(props) => props.theme.borderRadius.small};

  ${(props) =>
    props.optionsOpened
      ? css`
          border-bottom-right-radius: 1000;
        `
      : null}
  ${(props) =>
    props.focused && !props.disabled
      ? css`
          border-color: ${(props) => props.theme.accentColors.primary.color};
          box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
        `
      : null}

  ${(props) =>
    props.squaredRight
      ? css`
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        `
      : null}
    ${(props) =>
    props.squaredLeft
      ? css`
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        `
      : null}

  input {
    all: unset;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    width: 100%;
    padding: 9px 25px 9px ${(props) => (props.leftIcon ? 9 : 26)}px;
    background: ${(props) => (props.theme.isDark ? props.theme.baseColors.darker : 'white')};
    &::placeholder {
      color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
    }
  }

  .icon {
    display: block;
    position: static;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 18px;
    margin-left: 10px;
    padding: 13px 0 0 16px;
    color: ${(props) =>
      props.theme.isDark
        ? props.disabled
          ? props.theme.baseColors.darkMiddle
          : props.theme.accentColors.primary.color
        : props.disabled
        ? props.theme.baseColors.light
        : props.theme.baseColors.middleLight};
  }

  ${(props) =>
    props.disabled
      ? css`
          input {
            color: ${(props) =>
              props.theme.isDark ? props.theme.baseColors.darkMiddle : props.theme.baseColors.middleLight};

            &::placeholder {
              color: ${(props) =>
                props.theme.isDark ? props.theme.baseColors.darkMiddle : props.theme.baseColors.middleLight};
            }
          }
        `
      : null}
`;

const autoCloseTime = 50;
const Input = ({
  children,
  value,
  onChange,
  onClear,
  disabled,
  leftIcon,
  squaredRight,
  squaredLeft,
  autoCompleteOptions,
  block,
  onFocus,
  onBlur,
  readOnly,
  contained,
  actionButton,
  ...props
}) => {
  const inputRef = useRef(null);

  const [focusedCount, setFocusedCount] = useState(0);
  const [focused, setFocused] = useState(false);
  const [optionsOpened, setOptionsOpened] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (!focused) {
        setOptionsOpened(false);
      }
    }, autoCloseTime);

    return () => clearTimeout(timeout);
  }, [focused]);

  const _onFocus = (e) => {
    setFocused(true);
    onFocus && onFocus(e);
  };
  const _onBlur = (e) => {
    setFocused(false);
    setFocusedCount(0);
    onBlur && onBlur(e);
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    if (value.length >= 3) {
      setOptionsOpened(true);
    } else {
      setOptionsOpened(false);
    }
    onChange && onChange(value);
  };
  const onClearClick = (e) => {
    onChange && onChange('');
    inputRef.current.focus();
    onClear && onClear();
    setOptionsOpened(false);
  };
  const onOptionClick = (option) => {
    onChange(option.label);
    setOptionsOpened(false);
  };

  const onInputClick = () => {
    if (focusedCount > 1) {
      setOptionsOpened(true);
    }
    setFocusedCount(focusedCount + 1);
  };
  return (
    <StyledInputContainer
      onFocus={_onFocus}
      onBlur={_onBlur}
      focused={contained ? false : focused}
      onClick={onInputClick}
      optionsOpened={optionsOpened}
      Icon={leftIcon}
      block={block}
    >
      <StyledInput
        tabIndex={-1}
        disabled={disabled}
        squaredRight={squaredRight}
        squaredLeft={squaredLeft}
        focused={contained ? false : focused}
        optionsOpened={optionsOpened}
        actionButton
        leftIcon={leftIcon ? true : false}
      >
        {leftIcon ? leftIcon : null}
        <input
          ref={inputRef}
          {...props}
          value={value}
          disabled={disabled}
          onChange={onInputChange}
          readOnly={readOnly}
        />
        {!disabled && !readOnly ? (
          <ClearButton
            className="close-btn"
            icon
            transparent
            onClick={onClearClick}
            show={!!(value ? value.trim() : false)}
          >
            <IoIosClose />
          </ClearButton>
        ) : null}
        {actionButton && actionButton}
      </StyledInput>
      {autoCompleteOptions && (optionsOpened || false) ? (
        <Menu options={autoCompleteOptions} onOptionClick={onOptionClick} />
      ) : null}
    </StyledInputContainer>
  );
};

export const PickerLayout = styled.div`
  & input {
    all: unset;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    width: 100%;
    padding: 9px 35px 9px 26px;
    background: #151531;
    border-radius: 8px;
  }

  & .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background-color: #6670f0;
  }
`;

Input.defaultProps = {
  value: '',
  onChange: null,
  onClear: null,
  disabled: false,
  leftIcon: null,
  squaredRight: false,
  squaredLeft: false,
  autoCompleteOptions: undefined,
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.any,
  squaredRight: PropTypes.bool,
  squaredLeft: PropTypes.bool,
};

export default Input;
