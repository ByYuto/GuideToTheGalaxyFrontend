import React from 'react';
import styled from 'styled-components';

const LoaderLayout = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => (props.small ? '26px' : '80px')};
  height: ${(props) => (props.small ? '16px' : '80px')};
  & div {
    position: absolute;
    border: 2px solid ${(props) => (props.color ? props.color : '#fff')};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: ${(props) => (props.small ? '8px' : '36px')};
      left: ${(props) => (props.small ? '13px' : '36px')};
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -5px;
      left: 0px;
      width: ${(props) => (props.small ? '26px' : '72px')};
      height: ${(props) => (props.small ? '26px' : '72px')};
      opacity: 0;
    }
  }
`;

const Loader = ({ color, small }) => (
  <LoaderLayout color={color} small={small}>
    <div></div>
    <div></div>
  </LoaderLayout>
);
export default Loader;
