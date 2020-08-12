import React from 'react';
import styled from 'styled-components';

const StyledStepper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 23px 0;
  z-index: 20;
`;

const Step = styled.div`
  margin: 0 8px;
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  z-index: 20;
  background-color: ${(props) =>
    props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.middleLight};
`;

const Stepper = ({ step, maxStep = 4 }) => {
  return (
    <StyledStepper>
      {Array(maxStep)
        .fill()
        .map((_, index) => (
          <Step key={index} active={step === index + 1} />
        ))}
    </StyledStepper>
  );
};

export default Stepper;
