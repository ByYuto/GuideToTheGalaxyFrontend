import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaHandRock, FaRegHandRock } from 'react-icons/fa';

const StyledUpvoteCounter = styled.a`
  display: inline-flex;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.isDark ? props.theme.baseColors.middle : props.theme.baseColors.dark};

  span {
    margin-left: 6px;
  }

  &:hover {
    color: ${props => props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.darker};
  }
  
  &:active {
    color: ${props => props.theme.isDark ? props.theme.baseColors.middle : props.theme.baseColors.dark};
  }

`;

const UpvoteCounter = ({ count, ...rest }) => {
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };
  const Icon = hover ? FaHandRock : FaRegHandRock;
  return <StyledUpvoteCounter onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <Icon />
    <span>{count}</span>
  </StyledUpvoteCounter>
}

UpvoteCounter.defaultProps = {
  count: 0
};

UpvoteCounter.propTypes = {
  count: PropTypes.number
}


export default UpvoteCounter;