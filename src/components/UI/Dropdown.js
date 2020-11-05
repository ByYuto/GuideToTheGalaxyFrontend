import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import MenuOption from './MenuOption';
import { MdArrowDropDown } from 'react-icons/md';

const StyledDropdownContainer = styled.div`
  all: unset;
  display: inline-flex;
  box-sizing: border-box;
  position: relative;
`;

const StyledDropdownValue = styled.div`
  display: flex;
  position: relative;
  border: 1px solid ${(props) => (props.theme.isDark ? 'transparent' : props.theme.baseColors.middleLight)};
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 50px;
  height: 40px;
  flex-grow: 1;
  align-items: center;
  padding: 0 32px 0px 16px;
`;

const StyledIconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middle : props.theme.baseColors.middleLight)};
  z-index: 99;
`;

const Value = styled.div``;

const Placeholder = styled.div`
  color: ${(props) => props.theme.baseColors.middleLight};
`;

const DropdownMenu = styled(Menu)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  border: 1px solid ${(props) => (props.theme.isDark ? 'transparent' : props.theme.baseColors.middleLight)};
  border-radius: 8px;
  overflow: hidden;

  ${MenuOption} {
    //background: green;
  }
`;

const Dropdown = ({ children, placeholder, value, onChange, disabled, className, options, ...props }) => {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (opened) {
      const clickHandler = () => {
        setTimeout(() => {
          setOpened(false);
        }, 0);
      };
      document.body.addEventListener('click', clickHandler);
      return () => {
        document.body.removeEventListener('click', clickHandler);
      };
    }
  }, [opened]);
  const onClick = () => {
    setOpened(!opened);
  };
  const onOptionClick = (option) => {
    onChange && onChange(option);
  };

  return (
    <StyledDropdownContainer tabindex={0} className={className} {...props} onClick={onClick}>
      <StyledDropdownValue>
        {value ? <Value>{value.label}</Value> : <Placeholder>{placeholder}</Placeholder>}
      </StyledDropdownValue>
      {opened ? <DropdownMenu options={options} active={value} onOptionClick={onOptionClick}></DropdownMenu> : null}
      <StyledIconContainer>
        <MdArrowDropDown />
      </StyledIconContainer>
    </StyledDropdownContainer>
  );
};

Dropdown.defaultProps = {
  value: null,
  onChange: null,
  disabled: false,
  options: [],
  placeholder: 'Select a value',
};

export default styled(Dropdown)``;
