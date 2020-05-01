import React from 'react';
import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white};
  color: ${props => props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark};
`

export default View;