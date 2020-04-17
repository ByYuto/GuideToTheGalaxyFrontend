import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledTextAreaContainer = styled.div`
all: unset;
display: block;
box-sizing: border-box;
position: relative;

&:after{
  content: "${props => props.charsLeft}";
  position: absolute;
  right: 14px;
  bottom: 8px;
  font-family: Lato;
  font-size: 10px;
  line-height: 16px;
  color: ${props => props.theme.baseColors.middle}
}
`
const StyledTextArea = styled.textarea`
  all: unset;
  display: block;
  width: 100%;
  font-family: 'Open Sans';
  font-size: 14px;
  line-height: 22px;
  box-sizing: border-box;
  padding: 12px 14px;
  background: ${props => props.theme.isDark ? props.theme.baseColors.darker : "white"};
  border: 1px solid ${props => props.theme.isDark ? "transparent" : props.theme.baseColors.middleLight};
  color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark};
  border-radius: ${props => props.theme.borderRadius.small};
  &::placeholder {
    color: ${props => props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle};
  }    

  ${props => props.focused && !props.disabled ? css`
    border: 1px solid ${props => props.theme.accentColors.primary.color};
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  ` : null}  
`

const TextArea = ({ children, value, onChange, disabled, className, limit, ...props }) => {
  const [focused, setFocused] = useState(false);

  const onFocus = (e) => {
    setFocused(true);
  }
  const onBlur = (e) => {
    setFocused(false);
  };

  const _onChange = (e) => {
    onChange && onChange(e.target.value);
  }

  const charsLeft = limit ? (limit - value.length) : "";
  return <StyledTextAreaContainer focused={focused} charsLeft={charsLeft} {...props}>
    <StyledTextArea onFocus={onFocus} onBlur={onBlur} onChange={_onChange} focused={focused} value={value} {...props} />
  </StyledTextAreaContainer>
}

TextArea.defaultProps = {
  value: "",
  onChange: null,
  disabled: false,
  Icon: null,
  squaredRight: false,
  squaredLeft: false,
  autoCompleteOptions: undefined
};

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  Icon: PropTypes.elementType,
  squaredRight: PropTypes.bool,
  squaredLeft: PropTypes.bool,
}

export default styled(TextArea)``;

